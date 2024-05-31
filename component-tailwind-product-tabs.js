class ProductTabs extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.initTabs();
    }
  
    initTabs() {
      const tabs = this.querySelectorAll('.tab-heading');
      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
          this.showTab(index + 1);
        });
      });
    }
  
    showTab(tabNumber) {
      // Remove active class from all tab headings
      const allTabHeadings = this.querySelectorAll('.tab-heading');
      allTabHeadings.forEach(tabHeading => {
        tabHeading.classList.remove('active');
      });
  
      // Add active class to the clicked tab heading and scroll it into view
      const clickedTabHeading = this.querySelector(`.tab-heading:nth-child(${tabNumber})`);
      if (clickedTabHeading) {
        clickedTabHeading.classList.add('active');
        clickedTabHeading.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
  
      // Hide all tab contents
      const tabContents = this.querySelectorAll('.tab-content');
      tabContents.forEach(content => {
        content.style.display = 'none'; // Hide all contents
      });
  
      // Show the selected tab content
      const selectedTabContent = this.querySelector(`.tab-content[data-collection="${tabNumber}"]`);
      if (selectedTabContent) {
        selectedTabContent.style.display = 'block'; // Show the selected content
      }
    }
  }
  
  customElements.define('product-tabs', ProductTabs);
  