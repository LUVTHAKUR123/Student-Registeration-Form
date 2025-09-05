// // mock/index.js
// module.exports = {
//   "GET /api/users": (req, res) => {
//     res.status(200).json({
//       message: "data get successfull",
//       data: req.body,
//     });
//   },

//   "POST /api/users": (req, res) => {
//     res.status(201).json({
//       message: "User created successfully",
//       data: req.body,
//     });
//   },
// };
// //
// mock/index.js
export default [
  {
    url: "/api/users",
    method: "post",
    response: ({ body }) => ({
      message: "User created successfully",
      data: { ...body, id: Date.now().toString() },
    }),
  },
  {
    url: "/api/users",
    method: "get",
    response: () => ({
      message: "Data fetched successfully",
      data: [],
    }),
  },
];
