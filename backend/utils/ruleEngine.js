import Device from "../models/Device.js";
import Rule from "../models/Rule.js";

export const evaluateRules = async (
  triggerDeviceId,
  triggerValue
) => {
  try {
    console.log("EVALUATING RULES");

    const rules = await Rule.find({
      trigger_device_id: triggerDeviceId,
      trigger_condition: triggerValue,
      is_active: true
    });

    console.log("MATCHED RULES:", rules.length);

    for (const rule of rules) {

      const targetDevice =
        await Device.findById(
          rule.action_device_id
        );

      if (!targetDevice) continue;

      targetDevice.current_state = {
        ...targetDevice.current_state,
        power: rule.action_type
      };

      await targetDevice.save();

      console.log(
        `RULE EXECUTED -> ${targetDevice.name} ${rule.action_type}`
      );
    }

  } catch (err) {
    console.log(err);
  }
};