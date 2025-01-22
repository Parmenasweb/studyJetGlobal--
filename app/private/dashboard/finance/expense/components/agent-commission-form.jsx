"use client";

import { useQuery } from "@tanstack/react-query";
import * as z from "zod";
import { ExpenseForm } from "./expense-form";

const agentCommissionSchema = {
  agentId: z.string().min(1, "Agent is required"),
  leadId: z.string().min(1, "Lead is required"),
  commissionType: z.enum(["university", "agent", "other"]),
  percentage: z.coerce.number().min(0).max(100).optional(),
  baseAmount: z.coerce.number().min(0).optional(),
};

async function getAgents() {
  const res = await fetch("/api/agents");
  if (!res.ok) throw new Error("Failed to fetch agents");
  return res.json();
}

async function getLeads() {
  const res = await fetch("/api/leads");
  if (!res.ok) throw new Error("Failed to fetch leads");
  return res.json();
}

export function AgentCommissionForm({ onSubmit, isLoading, defaultValues }) {
  const {
    data: agents = [],
    isLoading: isLoadingAgents,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });

  const {
    data: leads = [],
    isLoading: isLoadingLeads,
  } = useQuery({
    queryKey: ["leads"],
    queryFn: getLeads,
  });

  return (
    <ExpenseForm
      category="agent-commission"
      onSubmit={onSubmit}
      isLoading={isLoading || isLoadingAgents || isLoadingLeads}
      defaultValues={defaultValues}
      additionalFields={agentCommissionSchema}
      additionalComponents={{
        agentId: {
          type: "select",
          label: "Agent",
          description: "Select the agent to pay commission",
          options: agents.map(agent => ({
            value: agent._id,
            label: agent.name
          }))
        },
        leadId: {
          type: "select",
          label: "Lead",
          description: "Select the lead this commission is for",
          options: leads.map(lead => ({
            value: lead._id,
            label: lead.studentName
          }))
        },
        commissionType: {
          type: "select",
          label: "Commission Type",
          description: "Select the type of commission",
          options: [
            { value: "university", label: "University Commission" },
            { value: "agent", label: "Agent Commission" },
            { value: "other", label: "Other Commission" }
          ]
        },
        percentage: {
          type: "number",
          label: "Commission Percentage",
          description: "Enter the commission percentage (optional)",
          placeholder: "e.g., 15"
        },
        baseAmount: {
          type: "number",
          label: "Base Amount",
          description: "Enter the base amount for commission calculation (optional)",
          placeholder: "e.g., 5000"
        }
      }}
    />
  );
} 