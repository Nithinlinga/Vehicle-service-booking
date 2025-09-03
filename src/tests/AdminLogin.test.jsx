import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, test } from "vitest";
import "@testing-library/jest-dom/vitest";
import AdminLogin from "../components/admin/AdminLogin";
describe("Admin Text",()=>{

    it('Intial State value check', ()=>{
      render(<AdminLogin/>);
      
      const count= screen.getByTestId('admin');
      expect(count.textContent).toBe('AdminLogin')
    });
})
