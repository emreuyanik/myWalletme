document.addEventListener("DOMContentLoaded", function () {
    // Initialize variables
    let expenses = [];
    let income = 0;
  
    // Form elements
    const harcamaForm = document.getElementById("harcama-formu");
    const ekleForm = document.getElementById("ekle-formu");
    const harcamaTableBody = document.getElementById("harcama-body");
    const gelirInput = document.getElementById("gelir-input");
    const gelirinizDisplay = document.getElementById("geliriniz");
    const giderinizDisplay = document.getElementById("gideriniz");
    const kalanDisplay = document.getElementById("kalan");
  
    // Event listener for the expense form
    harcamaForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Get form values
      const tarih = document.getElementById("tarih").value;
      const miktar = parseFloat(document.getElementById("miktar").value);
      const harcamaAlani = document.getElementById("harcama-alani").value;
  
      // Validate and add the expense
      if (tarih && !isNaN(miktar) && miktar > 0 && harcamaAlani) {
        expenses.push({ tarih, miktar, harcamaAlani });
        updateExpenseTable();
        updateFinancialSummary();
        harcamaForm.reset();
      } else {
        alert("Please fill in all the expense fields with valid values.");
      }
    });
  
    // Event listener for the income form
    ekleForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Get and add income
      const gelirMiktar = parseFloat(gelirInput.value);
      if (!isNaN(gelirMiktar) && gelirMiktar > 0) {
        income += gelirMiktar;
        updateFinancialSummary();
        gelirInput.value = "";
      } else {
        alert("Please enter a valid income amount.");
      }
    });
  
    // Event listener for clearing all data
    document.getElementById("temizle-btn").addEventListener("click", function () {
      expenses = [];
      income = 0;
      updateExpenseTable();
      updateFinancialSummary();
    });
  
    // Function to update the expense table
    function updateExpenseTable() {
      // Clear existing rows
      while (harcamaTableBody.firstChild) {
        harcamaTableBody.removeChild(harcamaTableBody.firstChild);
      }
  
      // Create and append new rows
      expenses.forEach((expense, index) => {
        const row = document.createElement("tr");
  
        const tarihCell = document.createElement("td");
        tarihCell.textContent = expense.tarih;
        row.appendChild(tarihCell);
  
        const harcamaAlaniCell = document.createElement("td");
        harcamaAlaniCell.textContent = expense.harcamaAlani;
        row.appendChild(harcamaAlaniCell);
  
        const miktarCell = document.createElement("td");
        miktarCell.textContent = expense.miktar;
        row.appendChild(miktarCell);
  
        const deleteButtonCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger";
        deleteButton.textContent = "Sil";
        deleteButton.addEventListener("click", function () {
          deleteExpense(index);
        });
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);
  
        harcamaTableBody.appendChild(row);
      });
    }
  
    // Function to update financial summary
    function updateFinancialSummary() {
      // Calculate total expenses
      const totalExpenses = expenses.reduce((total, expense) => total + expense.miktar, 0);
  
      // Calculate remaining balance
      const remainingBalance = income - totalExpenses;
  
      // Update display
      gelirinizDisplay.textContent = income.toFixed(2);
      giderinizDisplay.textContent = totalExpenses.toFixed(2);
      kalanDisplay.textContent = remainingBalance.toFixed(2);
    }
  
    // Function to delete an expense
    window.deleteExpense = function (index) {
      expenses.splice(index, 1);
      updateExpenseTable();
      updateFinancialSummary();
    };
  });
  