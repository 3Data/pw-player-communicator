# Changelog

## [2.0.0] - 2024-04-24

### New events

New event to expose the user cam status:

- userCamStatus(string: status)

### Removed methods

The next methods are no longer available. Sending tips or toys now should be done throug api request.

- sendTip(int: amount)
- sendToy(int: amount)

## [2.0.3] - 2026-03-04

New event and methods for onDemand

### New methods:

- requestOnDemand
- cancelOnDemand

### New event to expose the onDemand request status:

- onOndemandStatusUpdate(string: status)
