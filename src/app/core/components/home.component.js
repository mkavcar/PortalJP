//home.component.js
angular
  .module('rsp.core')
  .component("home", {
    controller: HomeController,
    templateUrl: 'app/core/components/home.html'
  });

HomeController.$inject = ['$timeout', 'uiGridConstants', 'utilService', 'quickViewService'];

function HomeController($timeout, uiGridConstants, utilService, quickViewService) {
  var ctrl = this, col2State = true;

  ctrl.selectedDeal = null;
  ctrl.selectedDeals = [];
  ctrl.invGoal = {};
  ctrl.searchObj = {
    field: null,
    value: null,
    comparer: null,
    name: {
      field: ['name'],
      comparer: utilService.filterByEquals
    },
    company: {
      field: ['company'],
      comparer: utilService.filterByContains
    },
    protection: {
        field: ['protection'],
        comparer: utilService.filterByArray
    },
    goal: {
        field: ['goal'],
        comparer: utilService.filterByArray
    }
  }

  ctrl.gridOptions = {
      enableSorting: true,
      rowHeight: 50,
      virtualizationThreshold: 300,
      enableColumnMenus: false,
      enableFiltering: true,
      enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
      enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
      columnDefs: [
        { field: 'name', cellTemplate: '<div class="ui-grid-cell-contents">{{:: COL_FIELD }}</div>' },
        { field: 'name', cellTemplate: '<div class="ui-grid-cell-contents">{{:: row.entity.name }}<div style="font-size:0.9em;color:#888">{{:: row.entity.company }}</div></div>' },
        { field: 'company', cellTemplate: '<div class="ui-grid-cell-contents">{{:: COL_FIELD }}</div>', enableSorting: false },
        { field: 'name', cellTemplate: '<div class="ui-grid-cell-contents">{{:: COL_FIELD }}</div>' },
        { field: 'gender', cellTemplate: '<div class="ui-grid-cell-contents">{{:: COL_FIELD }}</div>' },
        { field: 'company', cellTemplate: '<div class="ui-grid-cell-contents">{{:: COL_FIELD }}</div>', enableSorting: false }
      ],
      onRegisterApi: function( gridApi ) {
        ctrl.grid1Api = gridApi;
      }
  };

  ctrl.$onInit = $onInit;
  ctrl.search = search;
  ctrl.toggle = toggle;
  ctrl.view = view;
  ctrl.select = select;
  ctrl.invGoalChange = invGoalChange;
  ctrl.setGoal = setGoal;
  ctrl.removeDeal = removeDeal;
  ctrl.open = open;

  ////////////
  function $onInit() {
    bind();
  }

  function open(e) {
      e.preventDefault();

      alert('hello');
  }

  function invGoalChange() {
    //   var arrPrt = [];
    //   var arrGl = [];

    //   //set protection filter array
    //   if(ctrl.invGoal.mdl.fpg || ctrl.invGoal.mdl.fpi || ctrl.invGoal.mdl.fpc) arrPrt.push('Full Protection');
    //   if(ctrl.invGoal.mdl.hpg || ctrl.invGoal.mdl.hpi || ctrl.invGoal.mdl.hpc) arrPrt.push('Half Protection');
    //   if(ctrl.invGoal.mdl.npg || ctrl.invGoal.mdl.npi || ctrl.invGoal.mdl.npc) arrPrt.push('No Protection');
    
    //   //set goal filter array
    //   if(ctrl.invGoal.mdl.fpg || ctrl.invGoal.mdl.hpg || ctrl.invGoal.mdl.npg) arrGl.push('Growth');
    //   if(ctrl.invGoal.mdl.fpi || ctrl.invGoal.mdl.hpi || ctrl.invGoal.mdl.npi) arrGl.push('Income');
    //   if(ctrl.invGoal.mdl.fpc || ctrl.invGoal.mdl.hpc || ctrl.invGoal.mdl.npc) arrGl.push('Income+Growth');

    //   ctrl.searchObj.protection.value = arrPrt.length > 0 ? arrPrt :  null;
    //   ctrl.searchObj.goal.value = arrGl.length > 0 ? arrGl :  null;

    //  console.log(ctrl.searchObj.protection.value);
    //  console.log(ctrl.searchObj.goal.value);

    console.log(_.chain(ctrl.invGoal.value).mapValues(function (value, key) { return {field: key, value: value}; }).filter('value').map('field').value());
  }

  function setGoal(goalArr) {
    ctrl.invGoal.value = _.chain(goalArr).invert().mapValues(function () { return true; } ).value();
    ctrl.invGoalChange();      
  }

  function search(search) {
    ctrl.searchObj.field = search.field;
    ctrl.searchObj.value = search.value;
    ctrl.searchObj.comparer = search.comparer;

    bind();
  }

  function toggle() {
    if (col2State)
      angular.element("#table1 td:nth-child(2),#table1 th:nth-child(2)").hide();
    else
      angular.element("#table1 td:nth-child(2),#table1 th:nth-child(2)").show();


    col2State = !col2State;
  }

  function select(item, e, id) {
    ctrl.selectedDeal = null;   
    item.id = id;  
    if (e.currentTarget.checked) {
        item.checked = e.currentTarget.id;
        $("#row"+id).addClass('rsp-selectedRow');
    }
    else {
        item.checked = null;
        $("#row"+id).removeClass('rsp-selectedRow');
    } 
    
    ctrl.selectedDeals = _.filter(ctrl.data, function(_item) { return (_item.checked); });

    if (ctrl.selectedDeals.length > 0) {
        quickViewService.show();    
    }
    else {
        quickViewService.hide();    
    }
  }

  function view(item, e) {
    if (e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'LABEL') {
        if (ctrl.selectedDeals.length < 1) {
            ctrl.selectedDeal = item;
        }

        quickViewService.show();
    }
  }

  function removeDeal(id) {
      var item = _.find(ctrl.data, ['checked', id]);
      if (item) {
          item.checked = null;
      
        ctrl.selectedDeals = _.filter(ctrl.data, function(_item) { return (_item.checked); });
        document.getElementById(id).checked = false;
        $("#"+id.replace('cb','row')).removeClass('rsp-selectedRow');
      }
  }

  function bind() {
    //ctrl.isLoading = true;
    //$timeout(function() {
    //  
    //  ctrl.gridOptions.data = utilService.filterArray(data, ['name'], ctrl.searchText);
    //  ctrl.isLoading = false;  
    //}, 0);
    ctrl.data = utilService.filterArray(data, ctrl.searchObj.field, ctrl.searchObj.value, null, ctrl.searchObj.comparer);  

    //ctrl.invGoal = countInvGoal(ctrl.data);

    _.each(ctrl.data, function(item) {
        if (item.protection == 'Full Protection' && item.goal == 'Growth') item.invGoal = 1;
        if (item.protection == 'Full Protection' && item.goal == 'Income') item.invGoal = 2;
        if (item.protection == 'Full Protection' && item.goal == 'Income+Growth') item.invGoal = 3;
        if (item.protection == 'Half Protection' && item.goal == 'Growth') item.invGoal = 4;
        if (item.protection == 'Half Protection' && item.goal == 'Income') item.invGoal = 5;
        if (item.protection == 'Half Protection' && item.goal == 'Income+Growth') item.invGoal = 6;
        if (item.protection == 'No Protection' && item.goal == 'Growth') item.invGoal = 7;
        if (item.protection == 'No Protection' && item.goal == 'Income') item.invGoal = 8;
        if (item.protection == 'No Protection' && item.goal == 'Income+Growth') item.invGoal = 9;  
    });

    ctrl.invGoal = _.countBy(ctrl.data, 'invGoal');

    //console.log(_.chain(ctrl.data).map('gender').uniq().value());
  }

//   function countInvGoal(data) {
//       var invGoal = { fp: {}, hp: {}, np: {} };

//     _.each(data, function (item) {
//       if (item.protection == 'Full Protection')
//           compareGoal(item, invGoal.fp);
//       else if (item.protection == 'Half Protection')
//           compareGoal(item, invGoal.hp);
//       else if (item.protection == 'No Protection')
//           compareGoal(item, invGoal.np);
//     });

//     return invGoal;
//   }

//   function compareGoal(item, p) {
//     if (item.goal == 'Growth')
//         p.g = (p.g) ? p.g + 1 : 1;
//     else if (item.goal == 'Income')
//         p.i = (p.i) ? p.i + 1 : 1;
//     else if (item.goal == 'Income+Growth')
//         p.gi = (p.gi) ? p.gi + 1 : 1;
//   }
  



  var data = [
    {
        "name": "Ethel Price",
        "gender": "female",
        "company": "Enersol",
        "protection": "Full Protection",
        "goal": "Income"
    },
    {
        "name": "Claudine Neal",
        "gender": "female",
        "company": "Sealoud",
        "protection": "Full Protection",
        "goal": "Income"
    },
    {
        "name": "Beryl Rice",
        "gender": "female",
        "company": "Velity",
        "protection": "Full Protection",
        "goal": "Income"
    },
    {
        "name": "Wilder Gonzales",
        "gender": "male",
        "company": "Geekko",
        "protection": "Full Protection",
        "goal": "Income"
    },
    {
        "name": "Georgina Schultz",
        "gender": "female",
        "company": "Suretech",
        "protection": "Full Protection",
        "goal": "Income"
    },
    {
        "name": "Carroll Buchanan",
        "gender": "male",
        "company": "Ecosys",
        "protection": "Full Protection",
        "goal": "Income"
    },
    {
        "name": "Valarie Atkinson",
        "gender": "female",
        "company": "Hopeli",
        "protection": "Full Protection",
        "goal": "Income"
    },
    {
        "name": "Schroeder Mathews",
        "gender": "male",
        "company": "Polarium",
        "protection": "Full Protection",
        "goal": "Income"
    },
    {
        "name": "Lynda Mendoza",
        "gender": "female",
        "company": "Dogspa",
        "protection": "Full Protection",
        "goal": "Income"
    },
    {
        "name": "Sarah Massey",
        "gender": "female",
        "company": "Bisba",
        "protection": "Full Protection",
        "goal": "Income"
    },
    {
        "name": "Robles Boyle",
        "gender": "male",
        "company": "Comtract",
        "protection": "Full Protection",
        "goal": "Income"
    },
    {
        "name": "Evans Hickman",
        "gender": "male",
        "company": "Parleynet",
        "protection": "Full Protection",
        "goal": "Growth"
    },
    {
        "name": "Dawson Barber",
        "gender": "male",
        "company": "Dymi",
        "protection": "Half Protection",
        "goal": "Growth"
    },
    {
        "name": "Bruce Strong",
        "gender": "male",
        "company": "Xyqag",
        "protection": "No Protection",
        "goal": "Growth"
    },
    {
        "name": "Nellie Whitfield",
        "gender": "female",
        "company": "Exospace",
        "protection": "No Protection",
        "goal": "Growth"
    },
    {
        "name": "Jackson Macias",
        "gender": "male",
        "company": "Aquamate",
        "protection": "Full Protection",
        "goal": "Income+Growth"
    },
    {
        "name": "Pena Pena",
        "gender": "male",
        "company": "Quarx",
        "protection": "Full Protection",
        "goal": "Income+Growth"
    },
    {
        "name": "Lelia Gates",
        "gender": "female",
        "company": "Proxsoft",
        "protection": "Full Protection",
        "goal": "Income+Growth"
    },
    {
        "name": "Letitia Vasquez",
        "gender": "female",
        "company": "Slumberia",
        "protection": "Half Protection",
        "goal": "Income+Growth"
    },
    {
        "name": "Trevino Moreno",
        "gender": "male",
        "company": "Conjurica",
        "protection": "No Protection",
        "goal": "Income"
    },
    {
        "name": "Barr Page",
        "gender": "male",
        "company": "Apex",
        "protection": "No Protection",
        "goal": "Income"
    },
    {
        "name": "Kirkland Merrill",
        "gender": "male",
        "company": "Utara",
        "protection": "No Protection",
        "goal": "Growth"
    },
    {
        "name": "Blanche Conley",
        "gender": "female",
        "company": "Imkan",
        "protection": "No Protection",
        "goal": "Income"
    },
    {
        "name": "Atkins Dunlap",
        "gender": "male",
        "company": "Comveyor",
        "protection": "No Protection",
        "goal": "Income"
    },
    {
        "name": "Everett Foreman",
        "gender": "male",
        "company": "Maineland",
        "protection": "No Protection",
        "goal": "Income"
    },
    {
        "name": "Gould Randolph",
        "gender": "male",
        "company": "Intergeek",
        "protection": "No Protection",
        "goal": "Income"
    },
    {
        "name": "Kelli Leon",
        "gender": "female",
        "company": "Verbus",
        "protection": "No Protection",
        "goal": "Income"
    },
    {
        "name": "Freda Mason",
        "gender": "female",
        "company": "Accidency",
        "protection": "No Protection",
        "goal": "Income"
    },
    {
        "name": "Tucker Maxwell",
        "gender": "male",
        "company": "Lumbrex",
        "protection": "No Protection",
        "goal": "Income"
    },
    {
        "name": "Yvonne Parsons",
        "gender": "female",
        "company": "Zolar",
        "protection": "No Protection",
        "goal": "Income"
    },
    {
        "name": "Woods Key",
        "gender": "male",
        "company": "Bedder",
        "protection": "No Protection",
        "goal": "Income"
    },
    {
        "name": "Stephens Reilly",
        "gender": "male",
        "company": "Acusage",
        "protection": "No Protection",
        "goal": "Income"
    },
    {
        "name": "Mcfarland Sparks",
        "gender": "male",
        "company": "Comvey",
        "protection": "No Protection",
        "goal": "Income"
    },
    {
        "name": "Jocelyn Sawyer",
        "gender": "female",
        "company": "Fortean",
        "protection": "No Protection",
        "goal": "Income"
    },
    {
        "name": "Renee Barr",
        "gender": "female",
        "company": "Kiggle",
        "protection": "No Protection",
        "goal": "Income+Growth"
    },
    {
        "name": "Gaines Beck",
        "gender": "male",
        "company": "Sequitur",
        "protection": "No Protection",
        "goal": "Income"
    },
    {
        "name": "Luisa Farrell",
        "gender": "female",
        "company": "Cinesanct",
        "protection": "No Protection",
        "goal": "Income"
    },
    {
        "name": "Robyn Strickland",
        "gender": "female",
        "company": "Obones"
    },
    {
        "name": "Roseann Jarvis",
        "gender": "female",
        "company": "Aquazure"
    },
    {
        "name": "Johnston Park",
        "gender": "male",
        "company": "Netur"
    },
    {
        "name": "Wong Craft",
        "gender": "male",
        "company": "Opticall"
    },
    {
        "name": "Merritt Cole",
        "gender": "male",
        "company": "Techtrix"
    },
    {
        "name": "Dale Byrd",
        "gender": "female",
        "company": "Kneedles"
    },
    {
        "name": "Sara Delgado",
        "gender": "female",
        "company": "Netagy"
    },
    {
        "name": "Alisha Myers",
        "gender": "female",
        "company": "Intradisk"
    },
    {
        "name": "Felecia Smith",
        "gender": "female",
        "company": "Futurity"
    },
    {
        "name": "Neal Harvey",
        "gender": "male",
        "company": "Pyramax"
    },
    {
        "name": "Nola Miles",
        "gender": "female",
        "company": "Sonique"
    },
    {
        "name": "Herring Pierce",
        "gender": "male",
        "company": "Geeketron"
    },
    {
        "name": "Shelley Rodriquez",
        "gender": "female",
        "company": "Bostonic"
    },
    {
        "name": "Cora Chase",
        "gender": "female",
        "company": "Isonus"
    },
    {
        "name": "Mckay Santos",
        "gender": "male",
        "company": "Amtas"
    },
    {
        "name": "Hilda Crane",
        "gender": "female",
        "company": "Jumpstack"
    },
    {
        "name": "Jeanne Lindsay",
        "gender": "female",
        "company": "Genesynk"
    },
    {
        "name": "Frye Sharpe",
        "gender": "male",
        "company": "Eplode"
    },
    {
        "name": "Velma Fry",
        "gender": "female",
        "company": "Ronelon"
    },
    {
        "name": "Reyna Espinoza",
        "gender": "female",
        "company": "Prismatic"
    },
    {
        "name": "Spencer Sloan",
        "gender": "male",
        "company": "Comverges"
    },
    {
        "name": "Graham Marsh",
        "gender": "male",
        "company": "Medifax"
    },
    {
        "name": "Hale Boone",
        "gender": "male",
        "company": "Digial"
    },
    {
        "name": "Wiley Hubbard",
        "gender": "male",
        "company": "Zensus"
    },
    {
        "name": "Blackburn Drake",
        "gender": "male",
        "company": "Frenex"
    },
    {
        "name": "Franco Hunter",
        "gender": "male",
        "company": "Rockabye"
    },
    {
        "name": "Barnett Case",
        "gender": "male",
        "company": "Norali"
    },
    {
        "name": "Alexander Foley",
        "gender": "male",
        "company": "Geekosis"
    },
    {
        "name": "Lynette Stein",
        "gender": "female",
        "company": "Macronaut"
    },
    {
        "name": "Anthony Joyner",
        "gender": "male",
        "company": "Senmei"
    },
    {
        "name": "Garrett Brennan",
        "gender": "male",
        "company": "Bluegrain"
    },
    {
        "name": "Betsy Horton",
        "gender": "female",
        "company": "Zilla"
    },
    {
        "name": "Patton Small",
        "gender": "male",
        "company": "Genmex"
    },
    {
        "name": "Lakisha Huber",
        "gender": "female",
        "company": "Insource"
    },
    {
        "name": "Lindsay Avery",
        "gender": "female",
        "company": "Unq"
    },
    {
        "name": "Ayers Hood",
        "gender": "male",
        "company": "Accuprint"
    },
    {
        "name": "Torres Durham",
        "gender": "male",
        "company": "Uplinx"
    },
    {
        "name": "Vincent Hernandez",
        "gender": "male",
        "company": "Talendula"
    },
    {
        "name": "Baird Ryan",
        "gender": "male",
        "company": "Aquasseur"
    },
    {
        "name": "Georgia Mercer",
        "gender": "female",
        "company": "Skyplex"
    },
    {
        "name": "Francesca Elliott",
        "gender": "female",
        "company": "Nspire"
    },
    {
        "name": "Lyons Peters",
        "gender": "male",
        "company": "Quinex"
    },
    {
        "name": "Kristi Brewer",
        "gender": "female",
        "company": "Oronoko"
    },
    {
        "name": "Tonya Bray",
        "gender": "female",
        "company": "Insuron"
    },
    {
        "name": "Valenzuela Huff",
        "gender": "male",
        "company": "Applideck"
    },
    {
        "name": "Tiffany Anderson",
        "gender": "female",
        "company": "Zanymax"
    },
    {
        "name": "Jerri King",
        "gender": "female",
        "company": "Eventex"
    },
    {
        "name": "Rocha Meadows",
        "gender": "male",
        "company": "Goko"
    },
    {
        "name": "Marcy Green",
        "gender": "female",
        "company": "Pharmex"
    },
    {
        "name": "Kirk Cross",
        "gender": "male",
        "company": "Portico"
    },
    {
        "name": "Hattie Mullen",
        "gender": "female",
        "company": "Zilencio"
    },
    {
        "name": "Deann Bridges",
        "gender": "female",
        "company": "Equitox"
    },
    {
        "name": "Chaney Roach",
        "gender": "male",
        "company": "Qualitern"
    },
    {
        "name": "Consuelo Dickson",
        "gender": "female",
        "company": "Poshome"
    },
    {
        "name": "Billie Rowe",
        "gender": "female",
        "company": "Cemention"
    },
    {
        "name": "Bean Donovan",
        "gender": "male",
        "company": "Mantro"
    },
    {
        "name": "Lancaster Patel",
        "gender": "male",
        "company": "Krog"
    },
    {
        "name": "Rosa Dyer",
        "gender": "female",
        "company": "Netility"
    },
    {
        "name": "Christine Compton",
        "gender": "female",
        "company": "Bleeko"
    },
    {
        "name": "Milagros Finch",
        "gender": "female",
        "company": "Handshake"
    },
    {
        "name": "Ericka Alvarado",
        "gender": "female",
        "company": "Lyrichord"
    },
    {
        "name": "Sylvia Sosa",
        "gender": "female",
        "company": "Circum"
    },
    {
        "name": "Humphrey Curtis",
        "gender": "male",
        "company": "Corepan"
    }
];
};