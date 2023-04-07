let mockMessageData = [
  {
    date: "22-Mar-2023",
    time: "12:10:05",
    name: "mock Control Station 1",
    direction: "In",
    type: "Private",
    subscriberName: "mock Subs 1",
    subscriberId: 250,
    message: "This is a Mock Message",
  },
  {
    date: "22-Mar-2023",
    time: "15:40:05",
    name: "mock Control Station 2",
    direction: "Out",
    type: "Private",
    subscriberName: "mock Subs 4",
    subscriberId: 254,
    message:
      "This is a Mock Message 2, This will be a long message which will not come in one line , it needs to get displayed on the SideBar",
  },
];

module.exports = {
  mockMessageData,
};
