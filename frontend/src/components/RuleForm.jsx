import { useState } from "react";
import api from "../api";

export default function RuleForm({ devices, refreshRules }) {
  const [form, setForm] = useState({
    name: "",
    trigger_device_id: "",
    trigger_condition: "ON",
    action_device_id: "",
    action_type: "ON",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.post("/rules", form);
    alert("Rule Created");
    setForm({ name: "", trigger_device_id: "", trigger_condition: "ON", action_device_id: "", action_type: "ON" });
    refreshRules();
  };

  const selectClass = "w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400";
  const labelClass = "block text-sm font-medium text-gray-600 mb-1";

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white border border-gray-200 rounded-lg p-5 mb-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Create Automation Rule</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className={labelClass}>Rule Name</label>
          <input
            type="text"
            placeholder="e.g. Turn off lights when door closes"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className={labelClass}>Trigger Device</label>
          <select
            value={form.trigger_device_id}
            onChange={(e) => setForm({ ...form, trigger_device_id: e.target.value })}
            className={selectClass}
          >
            <option value="">Select device</option>
            {devices.map((d) => (
              <option key={d._id} value={d._id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Trigger Condition</label>
          <select
            value={form.trigger_condition}
            onChange={(e) => setForm({ ...form, trigger_condition: e.target.value })}
            className={selectClass}
          >
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Action Device</label>
          <select
            value={form.action_device_id}
            onChange={(e) => setForm({ ...form, action_device_id: e.target.value })}
            className={selectClass}
          >
            <option value="">Select device</option>
            {devices.map((d) => (
              <option key={d._id} value={d._id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Action</label>
          <select
            value={form.action_type}
            onChange={(e) => setForm({ ...form, action_type: e.target.value })}
            className={selectClass}
          >
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors cursor-pointer"
      >
        Create Rule
      </button>
    </form>
  );
}