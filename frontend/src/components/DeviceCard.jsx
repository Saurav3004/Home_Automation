import api from "../api";

export default function DeviceCard({ device, refresh }) {
  const togglePower = async (power) => {
    await api.post(`/devices/${device._id}/control`, { power });
    refresh();
  };

  const isOn = device.current_state?.power === "ON";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-gray-800">{device.name}</h3>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            isOn ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
          }`}
        >
          {isOn ? "ON" : "OFF"}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-3">Room: {device.room}</p>

      <div className="flex gap-2">
        <button
          onClick={() => togglePower("ON")}
          className="flex-1 py-1.5 text-sm bg-green-500 hover:bg-green-600 text-white rounded transition-colors cursor-pointer"
        >
          Turn On
        </button>
        <button
          onClick={() => togglePower("OFF")}
          className="flex-1 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors cursor-pointer"
        >
          Turn Off
        </button>
      </div>
    </div>
  );
}