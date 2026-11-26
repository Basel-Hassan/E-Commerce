"use client";

import { useState } from "react";

import { OrderCard } from "@/components/orders/order-card";
import type { Order } from "@/types/order";

type OrdersListProps = {
  orders: Order[];
};

export function OrdersList({ orders }: OrdersListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const orderId = String(order.id ?? order._id);

        return (
          <OrderCard
            key={order._id}
            order={order}
            expanded={expandedId === orderId}
            onToggle={() =>
              setExpandedId(expandedId === orderId ? null : orderId)
            }
          />
        );
      })}
    </div>
  );
}
