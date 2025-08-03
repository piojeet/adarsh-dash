const rowsPerPage = 15;

function setupPaginatedTables() {
  document.querySelectorAll('.brand__video-cont').forEach((container) => {
    const rows = container.querySelectorAll("table.influencer-table tbody tr");
    const pagination = container.querySelector(".search-pagination");
    const showingText = container.querySelector(".brand__totals-result");
    const searchInput = document.querySelector('.search-input');
    const exportButton = document.querySelector('.export-btn');
    const platformSelect = document.querySelector('.platform-select');
    const typeSelect = document.querySelector('.type-select');
    const searchButton = document.querySelector('.form__search-btn');

    let currentPage = 1;

    const getFilteredRows = () => {
      const platform = platformSelect?.value.toLowerCase() || "";
      const type = typeSelect?.value.toLowerCase() || "";
      const searchTerm = searchInput?.value.toLowerCase() || "";

      return Array.from(rows).filter(row => {
        const rowPlatform = row.dataset.platform?.toLowerCase() || "";
        const rowType = row.dataset.type?.toLowerCase() || "";
        const rowText = row.textContent.toLowerCase();

        const platformMatch = !platform || rowPlatform === platform;
        const typeMatch = !type || rowType === type;
        const searchMatch = !searchTerm || rowText.includes(searchTerm);

        return platformMatch && typeMatch && searchMatch;
      });
    };

    const renderPagination = (activePage, totalPages) => {
      pagination.innerHTML = "";

      if (totalPages <= 1) {
        pagination.style.display = "none";
        return;
      }

      pagination.style.display = "flex";

      const createButton = (html, disabled, onClick) => {
        const btn = document.createElement("button");
        btn.innerHTML = html;
        btn.disabled = disabled;
        btn.addEventListener("click", onClick);
        return btn;
      };

      const prevBtn = createButton("«", activePage === 1, () => {
        if (currentPage > 1) {
          currentPage--;
          renderPage(currentPage);
        }
      });
      pagination.appendChild(prevBtn);

      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === activePage) btn.classList.add("active");
        btn.addEventListener("click", () => {
          currentPage = i;
          renderPage(currentPage);
        });
        pagination.appendChild(btn);
      }

      const nextBtn = createButton("»", activePage === totalPages, () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderPage(currentPage);
        }
      });
      pagination.appendChild(nextBtn);
    };

    const renderPage = (page) => {
      const filteredRows = getFilteredRows();
      const total = filteredRows.length;
      const totalPages = Math.ceil(total / rowsPerPage);
      const start = (page - 1) * rowsPerPage;
      const end = page * rowsPerPage;

      rows.forEach(row => row.style.display = "none");

      filteredRows.forEach((row, index) => {
        if (index >= start && index < end) {
          row.style.display = "";
        }
      });

      // ✅ Only update text if showingText exists
      if (showingText) {
        showingText.innerHTML = `Showing ${start + 1} to ${Math.min(end, total)} of <span>${total}</span> results`;
      }

      renderPagination(page, totalPages);
    };

    const applyFilters = () => {
      currentPage = 1;
      renderPage(currentPage);
    };

    platformSelect?.addEventListener('change', applyFilters);
    typeSelect?.addEventListener('change', applyFilters);
    searchButton?.addEventListener('click', (e) => {
      e.preventDefault();
      applyFilters();
    });

    exportButton?.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = platformSelect?.value || 'Data';
      const type = typeSelect?.value || 'Export';
      const filename = `${platform}${type}.csv`.replace(/\s+/g, '');

      const headers = [
        "Video Id", "Title", "Channel", "Category", "Language", "Product Promotion", "Duration", "Published At"
      ];

      const csvRows = [headers.join(',')];

      const filteredRows = getFilteredRows();

      filteredRows.forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
          const cells = row.querySelectorAll('td');
          const data = Array.from(cells).slice(1).map(cell =>
            '"' + cell.textContent.trim().replace(/"/g, '""') + '"'
          );
          csvRows.push(data.join(','));
        }
      });

      if (csvRows.length === 1) {
        alert('Please select at least one visible row to export.');
        return;
      }

      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    });

    renderPage(currentPage);
  });
}

document.addEventListener("DOMContentLoaded", setupPaginatedTables);
