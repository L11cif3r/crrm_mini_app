import { createSelector } from "@reduxjs/toolkit";

export const selectLeads = (state) => state.leadsApi.queries;

export const selectLeadsByStatus = createSelector(
  selectLeads,
  (queries) => {
    const allLeads = Object.values(queries)
      .filter(q => q.data)
      .flatMap(q => q.data);

    return allLeads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {});
  }
);

export const selectTotalConvertedValue = createSelector(
  selectLeads,
  (queries) => {
    const allLeads = Object.values(queries)
      .filter(q => q.data)
      .flatMap(q => q.data);

    return allLeads
      .filter(lead => lead.status === "Converted")
      .reduce((sum, lead) => sum + (lead.value || 0), 0);
  }
);
