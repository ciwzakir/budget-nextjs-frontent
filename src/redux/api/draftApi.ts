import { baseApi } from "./baseApi";
import { tagTypes } from "./tag-types";

const DRAFT_BILL_URL = "/draft-bill";

export const draftBillListApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    onlyDraftBill: build.query({
      query: () => ({
        url: `${DRAFT_BILL_URL}/`,
        method: "GET",
      }),
      providesTags: [tagTypes.draftBill],
    }),

    // get single department by id
    getSingleBill: build.query({
      query: (id) => ({
        url: `${DRAFT_BILL_URL}/${id}/`,
        method: "GET",
      }),
      providesTags: [tagTypes.draftBill],
    }),

    // update single department by id
    updateDraftBill: build.mutation({
      query: (data) => ({
        url: `${DRAFT_BILL_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.updateSingleBill],
    }),

    deleteDraftBill: build.mutation({
      query: (id) => ({
        url: `${DRAFT_BILL_URL}/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.deleteSingleBill],
    }),

    // update ac department
    // update ac department
  }),
});

export const {
  useOnlyDraftBillQuery,
  useGetSingleBillQuery,
  useDeleteDraftBillMutation,
  useUpdateDraftBillMutation,
} = draftBillListApi;
