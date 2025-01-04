import { notFound } from "next/navigation";
import Agent from "@/models/Agent";
import { AgentForm } from "../../components/agent-form";
import connectDB from "@/lib/db";

async function getAgent(id) {
  await connectDB();
  const agent = await Agent.findById(id)
    .populate("createdBy", "name email")
    .populate("updatedBy", "name email");

  if (!agent) {
    notFound();
  }

  return agent;
}

export default async function EditAgentPage({ params }) {
  const agent = await getAgent(params.id);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Edit Agent: {agent.name}
        </h2>
      </div>

      <div className="grid gap-4">
        <AgentForm agent={JSON.parse(JSON.stringify(agent))} />
      </div>
    </div>
  );
}
