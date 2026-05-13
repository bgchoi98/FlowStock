package com.flowstock.inventory.domain;

public enum InventoryChangeType {
    INBOUND, // 입고
    OUTBOUND, // 출고
    ADJUST, // 재고조정
    ALLOCATION, // 할당
}
