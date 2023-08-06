// app.ts

(window as any).EmployeeOrgApp = EmployeeOrgApp;

// import { Employee, EmployeeOrgApp } from "./employee";

// Create the initial organization tree
const ceo: Employee = {
  uniqueId: 1,
  name: "John Smith",
  subordinates: [
    {
      uniqueId: 2,
      name: "Margot Donald",
      subordinates: [
        {
          uniqueId: 3,
          name: "Cassandra Reynolds",
          subordinates: [
            {
              uniqueId: 4,
              name: "Mary Blue",
              subordinates: [],
            },
            {
              uniqueId: 5,
              name: "Bob Saget",
              subordinates: [
                {
                  uniqueId: 6,
                  name: "Tina Teff",
                  subordinates: [
                    {
                      uniqueId: 7,
                      name: "Will Turner",
                      subordinates: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      uniqueId: 8,
      name: "Tyler Simpson",
      subordinates: [
        {
          uniqueId: 9,
          name: "Harry Tobs",
          subordinates: [
            {
              uniqueId: 10,
              name: "Thomas Brown",
              subordinates: [],
            },
          ],
        },
        {
          uniqueId: 11,
          name: "George Carrey",
          subordinates: [],
        },
        {
          uniqueId: 12,
          name: "Gary Styles",
          subordinates: [],
        },
      ],
    },
    {
      uniqueId: 13,
      name: "Ben Willis",
      subordinates: [],
    },
    {
      uniqueId: 14,
      name: "Georgina Flangy",
      subordinates: [
        {
          uniqueId: 15,
          name: "Sophie Turner",
          subordinates: [],
        },
      ],
    },
  ],
};


function displayOrganizationTree(data) {
   const organizationTreeElement = document.getElementById("organizationTree");
   if (organizationTreeElement) {
     organizationTreeElement.textContent = JSON.stringify(data, null, 2);
   }
 }


// Create an instance of EmployeeOrgApp
const app = new EmployeeOrgApp(ceo);

// Move Bob Saget to become the subordinate of Georgina Flangy
app.move(5, 14);
displayOrganizationTree(app.ceo);


// Print the updated organization tree
console.log(JSON.stringify(app.ceo, null, 2));

// Undo the move action
app.undo();
displayOrganizationTree(app.ceo);

// Print the organization tree after undo
console.log(JSON.stringify(app.ceo, null, 2));

// Redo the move action
app.redo();
displayOrganizationTree(app.ceo);

// Print the organization tree after redo
console.log(JSON.stringify(app.ceo, null, 2));
