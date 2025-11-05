import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["results"]
  static values = { url: String }

  connect() {
    this.hideResults()
    // Hide results when clicking outside
    this.boundClickOutside = this.clickOutside.bind(this)
    document.addEventListener('click', this.boundClickOutside)
  }

  clickOutside(event) {
    if (!this.element.contains(event.target)) {
      this.hideResults()
    }
  }

  async search(event) {
    const query = event.target.value.trim()
    
    if (query.length < 2) {
      this.hideResults()
      return
    }

    try {
      const response = await fetch(`${this.urlValue}?q=${encodeURIComponent(query)}`, {
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (!response.ok) throw new Error('Network response was not ok')
      
      const results = await response.json()
      this.displayResults(results)
    } catch (error) {
      console.error('Search error:', error)
      this.hideResults()
    }
  }

  displayResults(results) {
    if (results.length === 0) {
      this.resultsTarget.innerHTML = '<div class="p-3 text-sm text-gray-500">No servers found</div>'
    } else {
      this.resultsTarget.innerHTML = results.map(server => `
        <div class="p-3 hover:bg-gray-100 cursor-pointer" 
             data-mcp-server-slug="${server.slug}"
             data-mcp-server-name="${this.escapeHtml(server.display_value)}"
             data-action="click->mcp-server-autocomplete#selectResult">
          <div class="text-sm font-medium">${this.escapeHtml(server.display_value)}</div>
        </div>
      `).join('')
    }
    
    this.showResults()
  }

  selectResult(event) {
    const element = event.currentTarget
    const slug = element.dataset.mcpServerSlug
    const name = element.dataset.mcpServerName
    
    // Find the parent controller and call its selectServer method
    const parentController = this.application.getControllerForElementAndIdentifier(
      this.element.closest('[data-controller*="official-approval-queue"]'),
      'official-approval-queue'
    )
    
    if (parentController) {
      // Create a synthetic event that matches what selectServer expects
      const syntheticEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        target: element, // Add target for the click detection logic
        currentTarget: {
          dataset: {
            mcpServerSlug: slug,
            mcpServerName: name
          }
        }
      }

      parentController.selectServer(syntheticEvent)
    }
    
    // Hide the results dropdown
    this.hideResults()
  }

  showResults() {
    this.resultsTarget.classList.remove('hidden')
  }

  hideResults() {
    this.resultsTarget.classList.add('hidden')
  }

  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  }

  disconnect() {
    this.hideResults()
    if (this.boundClickOutside) {
      document.removeEventListener('click', this.boundClickOutside)
    }
  }
};
