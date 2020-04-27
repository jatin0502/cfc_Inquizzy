const Users = require("../models/users");
const Location = require("../models/locations");
const requests = require("../models/requests");
const objectId = require("mongodb").ObjectID;

async function addRequest({
  requested_item,
  requested_quantity,
  requested_urgency,
  userId,
  areaId,
}) {
  try {
    const newRequest = new requests({
      requested_item,
      requested_quantity,
      requested_urgency,
      user_id: userId,
      area_id: areaId,
    });

    await newRequest.save();
    return { requestsLink: "http://localhost:3000/MyRequests" };
  } catch (error) {
    return {
      error,
    };
  }
}

async function addRequests({ items, quantity, urgency, userId, areaId }) {
  let lastQuantityInArray = 1;
  let lastUrgencyInArray = "Urgently";
  for (let i = 0; i < items.length; i++) {
    let itemQuantity = 1;
    if (quantity[i]) {
      itemQuantity = quantity[i];
      lastQuantityInArray = quantity[i];
    } else {
      itemQuantity = lastQuantityInArray;
    }

    let itemUrgency = 1;
    if (urgency[i]) {
      itemUrgency = urgency[i];
      lastUrgencyInArray = urgency[i];
    } else {
      itemUrgency = lastUrgencyInArray;
    }

    await addRequest({
      requested_item: items[i],
      requested_quantity: itemQuantity,
      requested_urgency: itemUrgency,
      userId,
      areaId,
    });
  }
  return { requestsLink: "http://localhost:3000/MyRequests" };
}

async function acceptRequest({ requestId, userId }) {
  try {
    let response = {};
    await requests
      .updateOne(
        { _id: objectId(requestId) },
        {
          $set: {
            accepted_date: new Date(),
            assigned_to_id: objectId(userId),
            status: "in-progress",
          },
        }
      );
    const requestDetails = await requests.findById({ _id: objectId(requestId) });
    return {
      ...(requestDetails._doc),
      requested_date: (new Date(requestDetails.requested_date)).toLocaleDateString('en-US'),
      accepted_date: (new Date(requestDetails.accepted_date)).toLocaleDateString('en-US'),
      closed_date: (new Date(requestDetails.closed_date)).toLocaleDateString('en-US'),
    };
  } catch (error) {
    return {
      error,
    };
  }
}

async function completeRequest({ requestId, userId }) {
  try {
    let response = {};
    await requests
      .updateOne(
        { _id: objectId(requestId), assigned_to_id: objectId(userId) },
        { $set: { closed_date: new Date(), status: "closed" } }
      )
      .then((obj) => {
      }).catch((error) => {
        return {
          error,
        };
      });
    const requestDetails = await requests.findById({ _id: objectId(requestId) });
    return {
      ...(requestDetails._doc),
      requested_date: (new Date(requestDetails.requested_date)).toLocaleDateString('en-US'),
      accepted_date: (new Date(requestDetails.accepted_date)).toLocaleDateString('en-US'),
      closed_date: (new Date(requestDetails.closed_date)).toLocaleDateString('en-US'),
    };
  } catch (error) {
    return {
      error,
    };
  }
}

module.exports = {
  addRequest,
  addRequests,
  acceptRequest,
  completeRequest,
};
