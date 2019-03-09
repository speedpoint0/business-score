window.addEventListener("load", function() {




  document.getElementById('company-name-form').addEventListener("submit", function(e) {
    e.preventDefault(); // before the code
    /* do what you want with the form */
    var searchURL = "https://api.companieshouse.gov.uk/search/companies";
    var searchName = document.getElementById('first_name').value;
    $.ajax({
      type: 'GET',
      url: searchURL,
      dataType: "json",
      headers: {
       "Authorization": "Basic " + btoa("uyqRhJKv06UFc0k9JCLSG6jkIqXnC2r96G9_aMbw")
      },
      data: {
        q: searchName
      },
      success: function(data) {
        document.getElementById('data-output').innerHTML = data;
        var companyNumber = data.items[0].company_number;
        var companyName = data.items[0].title;
        document.getElementById("company-name").innerHTML = "Company Name: "+ companyName;
        next(companyNumber)
        console.log(companyNumber);
      }
    })
  })

  function next(companyNumber) {
    var searchURL = "https://api.companieshouse.gov.uk/company/" + companyNumber

    $.ajax({
      type: 'GET',
      url: searchURL,
      dataType: "json",
      headers: {
       "Authorization": "Basic " + btoa("uyqRhJKv06UFc0k9JCLSG6jkIqXnC2r96G9_aMbw")
      },
      success: function(data) {
        var companyStatus = data.company_status;
        var dateOfCreation = data.date_of_creation;
        var isOverdue = data.accounts.overdue;
        var hasInsolvencyHistory = data.has_insolvency_history;
        var inDispute = data.registered_office_is_in_dispute;
        var counter;
        var score = 858;


        document.getElementById("second").innerHTML = "Company Status: "+ companyStatus;
        document.getElementById("third").innerHTML = "Date of creation: "+ dateOfCreation;
        document.getElementById("fourth").innerHTML = "Anual Return Overdue: "+ isOverdue;
        document.getElementById("fifth").innerHTML = "Has Insolvency History: "+ hasInsolvencyHistory;
        document.getElementById("sixth").innerHTML = "In Dispute: "+ inDispute;

        if (isOverdue == true ) {
          score = score - 154;
        }

        if (hasInsolvencyHistory == true ) {
          score = score - 259;
        }

        if (inDispute == true ) {
          score = score - 350;
        }

        console.log(score);
        var scoreElem = document.getElementById("credit-score");
        scoreElem.innerHTML = "CREDIT SCORE: " + score;
        if (score > 700) {
          scoreElem.classList.add("green-text");
        } else if (score >500) {
          scoreElem.classList.add("orange-text");
        } else if (score <=500) {
          scoreElem.classList.add("red-text");

        }

      }
    })

  }





});
