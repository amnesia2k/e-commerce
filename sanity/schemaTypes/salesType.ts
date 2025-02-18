import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
  name: "sales",
  title: "Sales",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Sales Title",
    }),

    defineField({
      name: "description",
      type: "text",
      title: "Sales Description",
    }),

    defineField({
      name: "discountAmount",
      type: "number",
      title: "Discount Amount",
      description: "Amount off in percentage or fixed value",
    }),

    defineField({
      name: "couponCode",
      type: "string",
      title: "Coupon Code",
    }),

    defineField({
      name: "startDate",
      type: "datetime",
      title: "Start Date",
    }),

    defineField({
      name: "endDate",
      type: "datetime",
      title: "End Date",
    }),

    defineField({
      name: "isActive",
      type: "boolean",
      title: "Is Active",
      description: "Toggles to activate/deactivate sales",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "title",
      discountAmount: "discountAmount",
      couponCode: "couponCode",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, discountAmount, couponCode, isActive } = selection;
      const status = isActive ? "Active" : "Inactive";
      return {
        title,
        subtitle: `${discountAmount}% off - Code: ${couponCode} - ${status}`,
      };
    },
  },
});
