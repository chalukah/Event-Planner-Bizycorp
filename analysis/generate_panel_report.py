#!/usr/bin/env python3
"""
Aggregate veterinary panel performance metrics from Zoom attendee reports
and render a simple SVG bar chart visualising registrants vs unique attendees.
"""

from __future__ import annotations

import csv
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Callable, Iterable, List, Optional
from html import escape
import json


BASE_DIR = Path(__file__).resolve().parents[1]


@dataclass
class PanelReport:
    path: Path
    label: str
    topic_override: Optional[str] = None
    format: str = "standard"  # "standard" Zoom CSV or "simple" attendance list
    date_from_name: bool = False
    registrant_report: Optional[Path] = None


REPORTS: List[PanelReport] = [
    PanelReport(
        path=Path("VET/VET/OCT 2nd - Reports/Attendee Report - 02_10_2025 Topic Membership & Subscription Models_ Creating Recurring Revenue.csv"),
        label="Oct 02 – Membership Models",
    ),
    PanelReport(
        path=Path("VET/VET/8th Oct - Building a Modern Veterinary Practice That Thrives Through Innovation Leadership and Marketing/08th OCT - Veterinary Culture & Leadership Panel _ Attendee Report .csv"),
        label="Oct 08 – Culture & Leadership",
        format="simple",
        registrant_report=Path("VET/VET/8th Oct - Building a Modern Veterinary Practice That Thrives Through Innovation Leadership and Marketing/84025717176 - Registration Report (1).csv"),
    ),
    PanelReport(
        path=Path("Attendee reports/82168151982 - Attendee Report (1).csv"),
        label="Oct 30 – Talent Solutions",
    ),
    PanelReport(
        path=Path("Attendee reports/82543468223 - Attendee Report (1).csv"),
        label="Sep 18 – Her Voice",
    ),
    PanelReport(
        path=Path("Attendee reports/Attendee Report VET panel on Breaking Free from Outdated Habits That Hold Back Veterinary Practices - 04th September 2025.csv"),
        label="Sep 04 – Breaking Free",
    ),
    PanelReport(
        path=Path("Attendee reports/attendee_84901097925_2025_09_24.csv"),
        label="Sep 24 – Leadership Gap",
    ),
    PanelReport(
        path=Path("Attendee reports/attendee_86295072119_2025_09_29 - attendee_86295072119_2025_09_29.csv"),
        label="Sep 29 – Client Experience",
        topic_override="Understanding What Pet Owners Really Think (Client Experience)",
        format="simple",
        date_from_name=True,
    ),
]


@dataclass
class PanelMetrics:
    label: str
    topic: str
    start_time: datetime
    registrants: int
    attendees: int


def read_csv(path: Path) -> List[List[str]]:
    with path.open(newline="", encoding="utf-8-sig") as fh:
        rows = list(csv.reader(fh))
    # strip trailing empty rows
    return [row for row in rows if any(cell.strip() for cell in row)]


def parse_datetime(text: str) -> Optional[datetime]:
    text = text.strip().strip('"')
    if not text:
        return None
    for fmt in (
        "%b %d, %Y %I:%M %p",
        "%b %d, %Y %I:%M:%S %p",
        "%m/%d/%Y %I:%M:%S %p",
        "%m/%d/%Y %H:%M",
        "%m/%d/%Y %H:%M:%S",
    ):
        try:
            return datetime.strptime(text, fmt)
        except ValueError:
            continue
    return None


def parse_standard_report(report: PanelReport) -> PanelMetrics:
    rows = read_csv(report.path)
    summary_row: Optional[List[str]] = None
    for row in rows:
        if len(row) >= 5:
            try:
                registrants = int(row[4].strip())
            except (ValueError, IndexError):
                continue
            summary_row = row
            break
    if summary_row is None:
        raise ValueError(f"Could not find summary row in {report.path}")

    topic = report.topic_override or summary_row[0].strip().strip('"')
    registrants = int(summary_row[4].strip() or 0)
    start_raw = summary_row[2] if len(summary_row) > 2 else ""
    start_time = parse_datetime(start_raw)
    if start_time is None:
        raise ValueError(f"Unable to parse start time '{start_raw}' in {report.path}")

    # locate attendee details section
    attendee_section = None
    for idx, row in enumerate(rows):
        cell = row[0].strip() if row else ""
        if cell.lower().startswith("attendee details"):
            attendee_section = idx
            break
    attendees = 0
    if attendee_section is not None and attendee_section + 1 < len(rows):
        header = rows[attendee_section + 1]
        try:
            attended_idx = next(i for i, value in enumerate(header) if value.strip().lower() == "attended")
        except StopIteration:
            attended_idx = 0
        for row in rows[attendee_section + 2:]:
            if len(row) <= attended_idx or not row[attended_idx].strip():
                # end of attendee table
                break
            if row[attended_idx].strip().lower() == "yes":
                attendees += 1

    return PanelMetrics(
        label=report.label,
        topic=topic,
        start_time=start_time,
        registrants=registrants,
        attendees=attendees,
    )


def parse_registration_total(path: Path) -> int:
    rows = read_csv(path)
    for row in rows:
        if len(row) >= 5:
            try:
                return int(row[4].strip())
            except (ValueError, IndexError):
                continue
    raise ValueError(f"Could not extract registrant total from {path}")


def parse_simple_report(report: PanelReport) -> PanelMetrics:
    rows = read_csv(report.path)
    if not rows:
        raise ValueError(f"No data found in {report.path}")

    header_idx: Optional[int] = None
    variant = "attended"
    for idx, row in enumerate(rows):
        lowered = [cell.strip().lower() for cell in row]
        if any(cell == "attended" for cell in lowered):
            header_idx = idx
            variant = "attended"
            break
        if any(cell == "webinar id" for cell in lowered):
            header_idx = idx
            variant = "webinar"
            break

    if header_idx is None:
        raise ValueError(f"Could not detect header in {report.path}")

    topic = report.topic_override or report.label
    start_time: Optional[datetime] = None
    registrants = 0
    attendees = 0

    if variant == "attended":
        header = rows[header_idx]
        try:
            attended_idx = next(i for i, value in enumerate(header) if value.strip().lower().startswith("attended"))
        except StopIteration:
            attended_idx = 0

        summary_row = None
        for row in rows[:header_idx]:
            if len(row) >= 5:
                try:
                    int(row[4].strip())
                except (ValueError, IndexError):
                    continue
                summary_row = row
                break
        if summary_row:
            topic = report.topic_override or summary_row[0].strip().strip('"')
            summary_start = parse_datetime(summary_row[2] if len(summary_row) > 2 else "")
            if summary_start:
                start_time = summary_start
            registrants = int(summary_row[4].strip() or 0)

        counted_registrants = 0
        counted_attendees = 0
        for row in rows[header_idx + 1:]:
            if len(row) <= attended_idx:
                continue
            status = row[attended_idx].strip().lower()
            if status not in {"yes", "no"}:
                continue
            counted_registrants += 1
            if status == "yes":
                counted_attendees += 1

        if summary_row:
            attendees = counted_attendees
        else:
            registrants = counted_registrants
            attendees = counted_attendees

        if report.date_from_name:
            digits = "".join(ch for ch in report.path.stem if ch.isdigit() or ch == "_")
            date_fragment = digits[-10:]  # expect YYYY_MM_DD
            start_time = datetime.strptime(date_fragment, "%Y_%m_%d")

    elif variant == "webinar":
        header = rows[header_idx]
        data_rows = rows[header_idx + 1:]
        attendees = len([row for row in data_rows if any(cell.strip() for cell in row)])
        registrants = attendees  # default, may be overwritten below

        topic_row = next((row for row in rows[:header_idx] if row and row[0].strip().lower().startswith("webinar topic")), None)
        if topic_row and len(topic_row) > 1:
            topic = report.topic_override or topic_row[1].strip()

        date_row = next((row for row in rows[:header_idx] if row and "date and time" in row[0].strip().lower()), None)
        if date_row and len(date_row) > 1:
            date_text = date_row[1]
            for token in ["Eastern Time (US and Canada)", "Pacific Time (US and Canada)", "(US and Canada)"]:
                date_text = date_text.replace(token, "")
            date_text = date_text.strip()
            parsed = parse_datetime(date_text)
            if parsed:
                start_time = parsed

        if report.date_from_name and start_time is None:
            digits = "".join(ch for ch in report.path.stem if ch.isdigit() or ch == "_")
            date_fragment = digits[-10:]
            start_time = datetime.strptime(date_fragment, "%Y_%m_%d")

    if report.registrant_report:
        registrant_path = BASE_DIR / report.registrant_report
        if registrant_path.exists():
            registrants = parse_registration_total(registrant_path)

    if start_time is None:
        start_time = datetime.now()

    return PanelMetrics(
        label=report.label,
        topic=topic,
        start_time=start_time,
        registrants=registrants,
        attendees=attendees,
    )


def collect_metrics(reports: Iterable[PanelReport]) -> List[PanelMetrics]:
    metrics: List[PanelMetrics] = []
    for report in reports:
        full_path = BASE_DIR / report.path
        if not full_path.exists():
            print(f"Warning: {full_path} not found, skipping")
            continue
        if report.format == "simple":
            data = parse_simple_report(report)
        else:
            data = parse_standard_report(report)
        metrics.append(data)
    return sorted(metrics, key=lambda item: item.start_time)


def write_svg(metrics: List[PanelMetrics], output_path: Path) -> None:
    if not metrics:
        raise ValueError("No metrics supplied for chart generation")

    labels = [m.label for m in metrics]
    registrants = [m.registrants for m in metrics]
    attendees = [m.attendees for m in metrics]
    max_value = max(registrants + attendees) if metrics else 0

    attendance_pct = [
        f"{(att / reg * 100):.0f}%" if reg else "—"
        for reg, att in zip(registrants, attendees)
    ]

    margin_left = 120
    margin_bottom = 85
    margin_top = 70
    margin_right = 240
    spacing = 140
    bar_width = 38

    width = margin_left + margin_right + spacing * (len(metrics) - 1) + 90
    height = margin_top + margin_bottom + 300
    origin_x = margin_left
    origin_y = height - margin_bottom
    scale = (height - margin_top - margin_bottom) / max_value if max_value else 0

    def svg_line(x1: float, y1: float, x2: float, y2: float, **attrs: str) -> str:
        attr = " ".join(f"{k}='{v}'" for k, v in attrs.items())
        return f"<line x1='{x1}' y1='{y1}' x2='{x2}' y2='{y2}' {attr}/>"

    svg_parts = [
        f"<svg xmlns='http://www.w3.org/2000/svg' width='{width}' height='{height}' role='img' aria-labelledby='title desc'>",
        "<title id='title'>Veterinary panel performance</title>",
        "<desc id='desc'>Bar chart comparing registrants and unique attendees across September and October panels.</desc>",
        f"<rect x='0' y='0' width='{width}' height='{height}' fill='white' stroke='#e5e7eb'/>",
        "<defs><linearGradient id='viz-bg' x1='0' x2='0' y1='0' y2='1'><stop offset='0%' stop-color='#f9fafb'/><stop offset='100%' stop-color='#ffffff'/></linearGradient></defs>",
        f"<rect x='{margin_left - 80}' y='{margin_top - 40}' width='{width - margin_left - margin_right + 160}' height='{origin_y - margin_top + 50}' fill='url(#viz-bg)' rx='18'/>",
        svg_line(origin_x, origin_y, width - margin_right, origin_y, stroke="#9ca3af", **{"stroke-width": "1.4"}),
        svg_line(origin_x, origin_y, origin_x, margin_top - 12, stroke="#9ca3af", **{"stroke-width": "1.4"}),
        "<text x='{x}' y='{y}' text-anchor='middle' font-family='Segoe UI' font-size='20' font-weight='600' fill='#111827'>{text}</text>".format(
            x=width / 2,
            y=margin_top - 35,
            text=escape("Veterinary panels · Registrants vs Live attendees"),
        ),
        "<text x='{x}' y='{y}' text-anchor='middle' font-family='Segoe UI' font-size='13' fill='#4b5563'>{text}</text>".format(
            x=width / 2,
            y=margin_top - 12,
            text=escape("Snapshot of September–October 2025 sessions"),
        ),
    ]

    if max_value:
        tick_step = max(1, max_value // 5 or 1)
        for tick in range(0, max_value + 1, tick_step):
            y = origin_y - tick * scale
            svg_parts.append(
                svg_line(
                    origin_x - 12,
                    y,
                    width - margin_right,
                    y,
                    stroke="#e5e7eb",
                    **{"stroke-width": "1", "stroke-dasharray": "5 5"},
                )
            )
            svg_parts.append(svg_line(origin_x - 8, y, origin_x, y, stroke="#9ca3af", **{"stroke-width": "1.1"}))
            svg_parts.append(
                "<text x='{x}' y='{y}' text-anchor='end' font-family='Segoe UI' font-size='12' fill='#4b5563'>{tick}</text>".format(
                    x=origin_x - 14,
                    y=y + 4,
                    tick=tick,
                )
            )

    legend_x = width - margin_right + 30
    legend_y = margin_top + 12
    legend_items = [
        ("#4f46e5", "Registrants"),
        ("#0ea5e9", "Unique attendees"),
        ("#6366f1", "Attendance rate"),
    ]
    for idx, (color, text) in enumerate(legend_items):
        svg_parts.append(
            f"<rect x='{legend_x}' y='{legend_y + idx * 26}' width='14' height='14' rx='3' fill='{color}'/>"
        )
        svg_parts.append(
            "<text x='{x}' y='{y}' font-family='Segoe UI' font-size='13' fill='#1f2937'>{text}</text>".format(
                x=legend_x + 24,
                y=legend_y + idx * 26 + 12,
                text=escape(text),
            )
        )

    for idx, label in enumerate(labels):
        x_center = origin_x + idx * spacing
        for offset, value, color in [
            (-bar_width / 2, registrants[idx], "#4f46e5"),
            (bar_width / 2, attendees[idx], "#0ea5e9"),
        ]:
            bar_height = value * scale
            svg_parts.append(
                "<rect x='{x}' y='{y}' width='{w}' height='{h}' fill='{color}'/>".format(
                    x=x_center + offset - bar_width / 2,
                    y=origin_y - bar_height,
                    w=bar_width,
                    h=bar_height,
                    color=color,
                )
            )
            svg_parts.append(
                "<text x='{x}' y='{y}' text-anchor='middle' font-family='Segoe UI' font-size='12' font-weight='600' fill='#111827'>{value}</text>".format(
                    x=x_center + offset,
                    y=max(origin_y - bar_height - 10, margin_top),
                    value=value,
                )
            )
        label_lines = label.split(" - ") if " - " in label else [label]
        tspans = []
        for line_index, text in enumerate(label_lines):
            tspans.append(
                "<tspan x='{x}' dy='{dy}'>{text}</tspan>".format(
                    x=x_center,
                    dy=18 if line_index else 0,
                    text=escape(text),
                )
            )
        svg_parts.append(
            "<text x='{x}' y='{y}' text-anchor='middle' font-family='Segoe UI' font-size='13' fill='#111827'>{tspans}</text>".format(
                x=x_center,
                y=origin_y + 30,
                tspans="".join(tspans),
            )
        )
        svg_parts.append(
            "<text x='{x}' y='{y}' text-anchor='middle' font-family='Segoe UI' font-size='12' fill='#6366f1'>{text} {rate}</text>".format(
                x=x_center,
                y=origin_y + 30 + len(label_lines) * 18 + 16,
                text=escape("Attendance rate:"),
                rate=escape(attendance_pct[idx]),
            )
        )

    svg_parts.append("</svg>")
    output_path.write_text("\n".join(svg_parts), encoding="utf-8")


def write_html_dashboard(metrics: List[PanelMetrics], output_path: Path) -> None:
    labels = [m.label for m in metrics]
    registrants = [m.registrants for m in metrics]
    attendees = [m.attendees for m in metrics]
    attendance_pct = [
        round((att / reg * 100), 1) if reg else 0.0
        for reg, att in zip(registrants, attendees)
    ]
    topics = [m.topic for m in metrics]
    dates = [m.start_time.strftime("%Y-%m-%d") for m in metrics]

    chart_config = {
        "labels": labels,
        "datasets": [
            {
                "label": "Registrants",
                "data": registrants,
                "backgroundColor": "#4f46e5",
            },
            {
                "label": "Unique attendees",
                "data": attendees,
                "backgroundColor": "#0ea5e9",
            },
            {
                "label": "Attendance %",
                "data": attendance_pct,
                "type": "line",
                "yAxisID": "percentageAxis",
                "borderColor": "#6366f1",
                "backgroundColor": "rgba(99,102,241,0.25)",
                "tension": 0.3,
                "pointRadius": 5,
                "fill": False,
            },
        ],
    }

    table_rows = []
    for date, topic, reg, att, pct in zip(dates, topics, registrants, attendees, attendance_pct):
        table_rows.append(
            f"<tr><td>{escape(date)}</td><td>{escape(topic)}</td><td>{reg}</td><td>{att}</td><td>{pct:.1f}%</td></tr>"
        )

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Veterinary Panels Performance Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js" integrity="sha256-1zj0juL3xsVhGus/1G2Tn2twCoKh6gKEeGoutgCAi3Y=" crossorigin="anonymous"></script>
  <style>
    body {{
      font-family: "Segoe UI", Arial, sans-serif;
      margin: 0;
      padding: 24px;
      background: #f8fafc;
      color: #0f172a;
    }}
    h1 {{
      margin-bottom: 4px;
    }}
    h2 {{
      margin-top: 40px;
      margin-bottom: 12px;
    }}
    .card {{
      background: #fff;
      border-radius: 14px;
      padding: 24px;
      box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
      margin-top: 12px;
    }}
    th, td {{
      text-align: left;
      padding: 10px 12px;
      border-bottom: 1px solid #e2e8f0;
      font-size: 14px;
    }}
    th {{
      background: #f1f5f9;
      font-weight: 600;
    }}
    caption {{
      text-align: left;
      font-weight: 600;
      margin-bottom: 6px;
    }}
    .note {{
      font-size: 13px;
      color: #475569;
      margin-top: 6px;
    }}
  </style>
</head>
<body>
  <h1>Veterinary panels performance dashboard</h1>
  <p class="note">Interactive summary of September–October 2025 sessions. Hover over the chart for details or review the table below.</p>
  <div class="card">
    <canvas id="panels-chart" height="120"></canvas>
  </div>

  <h2>Session breakdown</h2>
  <div class="card">
    <table>
      <caption>Registrants and live attendance by session</caption>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Topic</th>
          <th scope="col">Registrants</th>
          <th scope="col">Unique attendees</th>
          <th scope="col">Attendance %</th>
        </tr>
      </thead>
      <tbody>
        {''.join(table_rows)}
      </tbody>
    </table>
  </div>

  <script>
    const ctx = document.getElementById('panels-chart').getContext('2d');
    new Chart(ctx, {{
      type: 'bar',
      data: {json.dumps(chart_config)},
      options: {{
        responsive: true,
        scales: {{
          y: {{
            beginAtZero: true,
            title: {{
              display: true,
              text: 'Count'
            }}
          }},
          percentageAxis: {{
            beginAtZero: true,
            position: 'right',
            ticks: {{
              callback: (value) => value + '%'
            }},
            grid: {{
              drawOnChartArea: false
            }}
          }}
        }},
        plugins: {{
          tooltip: {{
            callbacks: {{
              label: function(context) {{
                if (context.dataset.label === 'Attendance %') {{
                  return context.dataset.label + ': ' + context.parsed.y + '%';
                }}
                return context.dataset.label + ': ' + context.parsed.y;
              }}
            }}
          }}
        }}
      }}
    }});
  </script>
</body>
</html>
"""

    output_path.write_text(html, encoding="utf-8")


def format_summary(metrics: List[PanelMetrics]) -> str:
    lines = [
        "Date        | Registrants | Attendees | Topic",
        "------------|-------------|-----------|------",
    ]
    for m in metrics:
        lines.append(
            f"{m.start_time:%Y-%m-%d} | {m.registrants:11d} | {m.attendees:9d} | {m.topic}"
        )
    return "\n".join(lines)


def main() -> None:
    metrics = collect_metrics(REPORTS)
    if not metrics:
        print("No metrics collected.")
        return

    output_svg = BASE_DIR / "analysis/panel_performance_sep_oct.svg"
    write_svg(metrics, output_svg)
    output_html = BASE_DIR / "analysis/panel_performance_dashboard.html"
    write_html_dashboard(metrics, output_html)
    print(format_summary(metrics))
    print(f"\nStatic chart written to: {output_svg}")
    print(f"Interactive dashboard written to: {output_html}")


if __name__ == "__main__":
    main()
