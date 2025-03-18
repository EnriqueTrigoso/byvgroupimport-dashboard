declare module "dashboard/PieChart" {
    import { ComponentType } from "react";
    const Header: ComponentType<any>;
    export default Header;
  }
  
  declare module "dashboard/*" {
    import { ComponentType } from "react";
    const Component: ComponentType<any>;
    export default Component;
  }
  