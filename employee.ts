// employee.ts

interface Employee {
  uniqueId: number;
  name: string;
  subordinates: Employee[];
}

interface IEmployeeOrgApp {
  ceo: Employee;
  move(employeeID: number, supervisorID: number): void;
  undo(): void;
  redo(): void;
}

class EmployeeOrgApp implements IEmployeeOrgApp {
  private history: { action: "move" | "undo" | "redo"; data: any }[] = [];
  private currentIndex: number = -1;

  constructor(public ceo: Employee) {}

  move(employeeID: number, supervisorID: number): void {
    const { employee, oldSupervisor } = this.findEmployeeAndOldSupervisor(
      this.ceo,
      employeeID
    );

    if (!employee || !oldSupervisor) {
      throw new Error("Invalid employee or supervisor ID");
    }

    const newSupervisor = this.findEmployee(this.ceo, supervisorID);
    if (!newSupervisor) {
      throw new Error("Invalid new supervisor ID");
    }

    this.history = this.history.slice(0, this.currentIndex + 1);
    this.currentIndex++;

    this.history.push({
      action: "move",
      data: { employee, oldSupervisor },
    });

    oldSupervisor.subordinates = oldSupervisor.subordinates.filter(
      (subordinate) => subordinate.uniqueId !== employeeID
    );

    newSupervisor.subordinates.push(employee);
  }

  undo(): void {
    if (this.currentIndex >= 0) {
      const { employee, oldSupervisor } = this.history[this.currentIndex].data;
      oldSupervisor.subordinates.push(employee);
      this.currentIndex--;
    }
  }

  redo(): void {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      const { employee, oldSupervisor } = this.history[this.currentIndex].data;
      oldSupervisor.subordinates = oldSupervisor.subordinates.filter(
        (subordinate) => subordinate.uniqueId !== employee.uniqueId
      );
    }
  }

  private findEmployee(
    supervisor: Employee,
    employeeID: number
  ): Employee | undefined {
    if (supervisor.uniqueId === employeeID) {
      return supervisor;
    }

    for (const subordinate of supervisor.subordinates) {
      const result = this.findEmployee(subordinate, employeeID);
      if (result) {
        return result;
      }
    }

    return undefined;
  }

  private findEmployeeAndOldSupervisor(
    supervisor: Employee,
    employeeID: number
  ): { employee?: Employee; oldSupervisor?: Employee } {
    if (!supervisor.subordinates || supervisor.subordinates.length === 0) {
      return {};
    }

    for (const subordinate of supervisor.subordinates) {
      if (subordinate.uniqueId === employeeID) {
        return { employee: subordinate, oldSupervisor: supervisor };
      } else {
        const result = this.findEmployeeAndOldSupervisor(subordinate, employeeID);
        if (result.employee && result.oldSupervisor) {
          return result;
        }
      }
    }

    return {};
  }
}


(window as any).EmployeeOrgApp = EmployeeOrgApp;