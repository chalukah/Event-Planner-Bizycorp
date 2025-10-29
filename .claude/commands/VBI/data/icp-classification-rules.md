# ICP Classification Rules

## Overview
ICP (Ideal Customer Profile) classification determines which panel event registrants are qualified leads for VBI products and services.

## Classification Algorithm

### Step 1: Country Validation
**Rule**: Registrant must be from an allowed country

**Allowed Countries**:
- United States
- Canada
- United Kingdom
- Australia
- New Zealand
- United Arab Emirates

**Logic**:
```
IF country NOT IN allowed_countries THEN
  icpConfirmation = "No"
  STOP (skip further checks)
END IF
```

### Step 2: Job Title Normalization
**Rule**: Normalize job title for keyword matching

**Process**:
1. Convert to lowercase
2. Remove punctuation (periods, commas, hyphens)
3. Trim whitespace
4. Expand common abbreviations:
   - "mgr" → "manager"
   - "dir" → "director"
   - "admin" → "administrator"
   - "coord" → "coordinator"

### Step 3: Negative Keyword Check (Disqualifiers)
**Rule**: If job title contains ANY negative keyword, immediately disqualify

**Negative Keywords**:
- student
- assistant (unless "assistant manager")
- technician
- vet tech
- veterinary technician
- CVT (Certified Veterinary Technician)
- RVT (Registered Veterinary Technician)
- LVT (Licensed Veterinary Technician)
- CSR (Customer Service Representative)
- customer service
- receptionist
- front desk
- kennel
- groomer
- intern
- extern
- volunteer

**Logic**:
```
FOR EACH negative_keyword IN negative_keywords:
  IF normalized_title CONTAINS negative_keyword THEN
    icpConfirmation = "No"
    STOP
  END IF
END FOR
```

**Exception**: "Assistant Manager", "Assistant Director" are POSITIVE (manager/director overrides assistant)

### Step 4: Positive Keyword Check (Qualifiers)
**Rule**: If job title contains ANY positive keyword (and no negative keywords), qualify as ICP

**Positive Keywords**:
- practice manager
- office manager
- practice administrator
- hospital manager
- clinic manager
- hospital administrator
- owner
- co-owner
- partner
- managing partner
- DVM owner (Doctor of Veterinary Medicine owner)
- consultant
- coach
- business coach
- practice consultant
- director
- executive director
- managing director
- CEO (Chief Executive Officer)
- COO (Chief Operating Officer)
- CFO (Chief Financial Officer)
- VP (Vice President)
- president
- operations manager
- regional manager
- multi-site manager

**Logic**:
```
FOR EACH positive_keyword IN positive_keywords:
  IF normalized_title CONTAINS positive_keyword THEN
    icpConfirmation = "Yes"
    STOP
  END IF
END FOR
```

### Step 5: Manual Review
**Rule**: If no positive or negative keywords matched, flag for manual review

**Logic**:
```
IF no_keywords_matched THEN
  icpConfirmation = "Manual Review"
  flag_for_human_review = true
END IF
```

## Edge Cases

### Case 1: "Practice Owner DVM"
- Contains "owner" (positive)
- Result: **ICP = Yes**

### Case 2: "Veterinary Technician Manager"
- Contains "technician" (negative) but also "manager" (positive)
- Resolution: Manager takes precedence
- Result: **ICP = Yes**

### Case 3: "Office Assistant"
- Contains "assistant" (negative)
- Does NOT contain "manager" or "director"
- Result: **ICP = No**

### Case 4: "Assistant Practice Manager"
- Contains "assistant" (negative) but also "practice manager" (positive)
- Resolution: Practice Manager takes precedence
- Result: **ICP = Yes**

### Case 5: "Student Extern"
- Contains "student" (negative)
- Result: **ICP = No**

### Case 6: "Business Consultant - Veterinary"
- Contains "consultant" (positive)
- Result: **ICP = Yes**

### Case 7: "DVM" (only)
- No negative keywords
- No positive keywords (DVM alone doesn't indicate management role)
- Result: **ICP = Manual Review**

### Case 8: "Receptionist" from Australia
- Country = Australia (allowed)
- Contains "receptionist" (negative)
- Result: **ICP = No**

### Case 9: Empty job title
- No data to classify
- Result: **ICP = Manual Review**

## Implementation in Code

### Python (from generate_panel_sheet.py)
```python
def classify_icp(country, job_title):
    # Step 1: Country check
    allowed_countries = ['united states', 'canada', 'united kingdom',
                        'australia', 'new zealand', 'united arab emirates']
    if country.lower().strip() not in allowed_countries:
        return "No"

    # Step 2: Normalize title
    title = job_title.lower().strip()

    # Step 3: Negative keywords
    negative_keywords = ['student', 'technician', 'vet tech', 'csr',
                        'receptionist', 'assistant', 'intern', 'volunteer']
    for keyword in negative_keywords:
        if keyword in title and 'manager' not in title and 'director' not in title:
            return "No"

    # Step 4: Positive keywords
    positive_keywords = ['practice manager', 'office manager', 'owner',
                        'consultant', 'coach', 'director', 'ceo', 'coo',
                        'cfo', 'president', 'vp', 'administrator']
    for keyword in positive_keywords:
        if keyword in title:
            return "Yes"

    # Step 5: Manual review
    return "Manual Review"
```

### TypeScript (future implementation)
```typescript
function classifyICP(country: string, jobTitle: string): 'Yes' | 'No' | 'Manual Review' {
  const allowedCountries = ['united states', 'canada', 'united kingdom',
                           'australia', 'new zealand', 'united arab emirates'];

  if (!allowedCountries.includes(country.toLowerCase().trim())) {
    return 'No';
  }

  const title = jobTitle.toLowerCase().trim();

  const negativeKeywords = ['student', 'technician', 'vet tech', 'csr',
                           'receptionist', 'assistant', 'intern', 'volunteer'];
  for (const keyword of negativeKeywords) {
    if (title.includes(keyword) && !title.includes('manager') && !title.includes('director')) {
      return 'No';
    }
  }

  const positiveKeywords = ['practice manager', 'office manager', 'owner',
                           'consultant', 'coach', 'director', 'ceo', 'coo',
                           'cfo', 'president', 'vp', 'administrator'];
  for (const keyword of positiveKeywords) {
    if (title.includes(keyword)) {
      return 'Yes';
    }
  }

  return 'Manual Review';
}
```

## Metrics and Reporting

### ICP Conversion Rate
**Formula**: `(Total ICP Registrations / Total Registrations) × 100`

**Target**: 40-60% ICP rate for panel events

**Interpretation**:
- <30%: Poor targeting, improve promotional messaging
- 30-40%: Below target, refine audience
- 40-60%: Excellent targeting
- >60%: Very focused audience (may be limiting reach)

### ICP Attendance Rate
**Formula**: `(ICP Attendees / Total ICP Registrations) × 100`

**Target**: 30-50% attendance rate

### ICP to MSM Conversion Rate
**Formula**: `(Total MSMs Booked / ICP Attendees) × 100`

**Target**: 10-20% MSM conversion rate

## Manual Review Process

### When to Flag for Manual Review
1. Job title doesn't contain clear keywords
2. Ambiguous titles (e.g., "DVM", "Veterinarian")
3. Non-English job titles
4. Custom/creative titles
5. Missing job title data

### Manual Review Checklist
For each flagged lead, review:
1. **Job Title**: Does role involve business/management decisions?
2. **Company**: Size of practice (single-location vs. multi-site)
3. **LinkedIn Profile**: Verify actual responsibilities
4. **Registration Questions**: Any additional context provided?
5. **Email Domain**: Corporate vs. personal email

### Decision Framework
**Qualify as ICP if**:
- Decision-making authority for practice operations
- Budget authority for services/tools
- Strategic role (not purely clinical)

**Disqualify if**:
- Purely clinical role with no business responsibilities
- Student or entry-level position
- No decision-making authority

## Continuous Improvement

### Quarterly Review
- Analyze manual review patterns
- Identify new keywords to add (positive or negative)
- Update country list based on expansion plans
- Refine algorithm based on conversion data

### Feedback Loop
- Sales team feedback on lead quality
- MSM conversion data analysis
- False positive/negative identification
- Keyword effectiveness analysis
