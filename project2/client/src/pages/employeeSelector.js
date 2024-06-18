import { createSelector } from '@reduxjs/toolkit'

const selectEmployee = (state) => state.employee;

export const selectUserData = createSelector(
  [selectEmployee],
  (employee) => employee
);

export const selectApplicationStatus = createSelector(
  [selectEmployee],
  (employee) => employee.applicationStatus
);

export const selectApplicationFeedback = createSelector(
  [selectEmployee],
  (employee) => employee.applicationFeedback
);