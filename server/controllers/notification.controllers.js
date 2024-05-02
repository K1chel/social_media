import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username avatar",
    });

    await Notification.updateMany({ to: userId }, { read: true });

    res.json(notifications);
  } catch (error) {
    console.log(`Error in getNotifications: ${error}`);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.deleteMany({ to: userId });

    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.log(`Error in deleteNotification: ${error}`);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { id: notificationId } = req.params;
    const userId = req.user._id;

    const notification = await Notification.findById(notificationId);

    if (notification.to.toString() !== userId.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await Notification.findByIdAndDelete(notificationId);

    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.log(`Error in deleteById: ${error}`);
    res.status(500).json({ message: "Server error" });
  }
};
