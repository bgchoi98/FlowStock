package com.flowstock.inventory.domain;

import com.flowstock.common.entity.BaseCreatedEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "inventory_histories")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InventoryHistory extends BaseCreatedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long historyId; // 이력 ID

    @Column(name = "product_id", nullable = false)
    private Long productId; // 상품 ID

    @Column(name = "warehouse_id", nullable = false)
    private Long warehouseId; // 창고 ID

    @Column(name = "location_id", nullable = false)
    private Long locationId; // 로케이션 ID

    @Enumerated(EnumType.STRING)
    @Column(name = "change_type", nullable = false, length = 30)
    private InventoryChangeType changeType; // 변경 유형

    @Column(name = "before_on_hand_qty", nullable = false)
    private Integer beforeOnHandQty; // 변경 전 현재고 수량

    @Column(name = "after_on_hand_qty", nullable = false)
    private Integer afterOnHandQty; // 변경 후 현재고 수량

    @Column(name = "change_qty", nullable = false)
    private Integer changeQty; // 변경 수량

    @Enumerated(EnumType.STRING)
    @Column(name = "ref_type", length = 30)
    private InventoryRefType refType; // 참조 유형

    @Column(name = "ref_id")
    private Long refId; // 참조 ID

    @Column(length = 255)
    private String reason; // 사유

    @Column(name = "created_by_user_id")
    private Long createdByUserId; // 생성자 사용자 ID
}
