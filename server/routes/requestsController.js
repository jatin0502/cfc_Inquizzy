const express = require('express');
const requests = require('../models/requests');
const users = require('../models/users');
const reqService = require('../services/requestService');
const requestsRouter = express.Router();
const mongoose = require('mongoose');
const objectId = require("mongodb").ObjectID;

requestsRouter.get('/getAllRequestsForUser/:id', async (req, res) => {
    let response = [];
    const userId = req.params.id;
    requests.find({ "user_id": userId }, async (err, data) =>{
        if (err) {
          response = { error: true, message: 'Error fetching data' };
        } else {
          response = Promise.all(data.map(async (match) => ({
            _id: match._id,
            requested_item: match.requested_item,
            requested_quantity: match.requested_quantity,
            requested_urgency: match.requested_urgency,
            requested_date: new Date(match.requested_date).toLocaleDateString('en-US'),
            area_id: match.area_id,
            status: match.status,
            assigned_to_id: match.assigned_to_id,
            accepted_date: new Date(match.accepted_date).toLocaleDateString('en-US'),
            closed_date: new Date(match.closed_date).toLocaleDateString('en-US'),
            volunteer_details: match.assigned_to_id ? await (users.findById({_id: match.assigned_to_id})) : null
          })));
        }
        res.json(await response);
      });

      return res;
});

requestsRouter.get('/getAllRequestsForLocation/:id/:currentUserId', async (req, res) => {
    let response = [];
    const locationId = req.params.id;
    const currentUserId = req.params.currentUserId;

    requests.find({ "area_id": locationId, "user_id": { $ne: mongoose.Types.ObjectId(currentUserId) } }, async (err, data) =>{
        if (err) {
          response = { error: true, message: 'Error fetching data' };
        } else {
          response = Promise.all(data.map(async (match) => ({
			      _id: match._id,
            requested_item: match.requested_item,
            requested_quantity: match.requested_quantity,
            requested_urgency: match.requested_urgency,
            requested_date: new Date(match.requested_date).toLocaleDateString('en-US'),
            userId: match.user_id,
            status: match.status,
            assigned_to_id: match.assigned_to_id,
            accepted_date: new Date(match.accepted_date).toLocaleDateString('en-US'),
            closed_date: new Date(match.closed_date).toLocaleDateString('en-US'),
            requester_details: await (users.findById({_id: mongoose.Types.ObjectId(match.user_id)}))
          })));
        }
        res.json(await response);
      });

      return res;
});

requestsRouter.post('/addRequest', (req, res, next) => {  
    reqService
    .addRequest(req.body)
    .then((user) => (user ? res.json(user) : res.status(400).json()))
    .catch((err) => next(err));
    return res;
});

requestsRouter.post('/addRequests', (req, res, next) => {  
  reqService
  .addRequests(req.body)
  .then((user) => (user ? res.json(user) : res.status(400).json()))
  .catch((err) => next(err));
  return res;
});

requestsRouter.post('/acceptRequest/:requestId/:userId', (req, res) => {
  reqService
  .acceptRequest(req.params)
  .then((user) => (user ? res.json(user) : res.status(400).json()))
  .catch((err) => next(err));
  return res;
});

requestsRouter.post('/completeRequest/:requestId/:userId', (req, res) => {
  reqService
  .completeRequest(req.params)
  .then((user) => (user ? res.json(user) : res.status(400).json()))
  .catch((err) => next(err));
  return res;
});

module.exports = requestsRouter;
