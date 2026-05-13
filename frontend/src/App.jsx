import { useEffect, useState } from "react";
import api from "./api";
import DeviceCard from "./components/DeviceCard";
import RuleForm from "./components/RuleForm";

export default function App() {
  const [devices, setDevices] = useState([]);
  const [rules, setRules] = useState([]);

  const fetchDevices = async () => {
    const res = await api.get("/devices");
    setDevices(res.data);
  };

  const fetchRules = async () => {
    const res = await api.get("/rules");
    setRules(res.data);
  };

  useEffect(() => {
    fetchDevices();
    fetchRules();
    const interval = setInterval(fetchDevices, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Smart Home Dashboard</h1>

        <RuleForm devices={devices} refreshRules={fetchRules} />

        <h2 className="text-lg font-semibold text-gray-800 mb-3">Devices</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {devices.map((device) => (
            <DeviceCard key={device._id} device={device} refresh={fetchDevices} />
          ))}
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-3">Automation Rules</h2>
        <div className="space-y-2">
          {rules.map((rule) => (
            <div
              key={rule._id}
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between shadow-sm"
            >
              <span className="text-sm font-medium text-gray-800">{rule.name}</span>
              <div className="flex gap-2 text-xs text-gray-500">
                <span className="bg-gray-100 px-2 py-0.5 rounded">If {rule.trigger_condition}</span>
                <span>→</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded">{rule.action_type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}