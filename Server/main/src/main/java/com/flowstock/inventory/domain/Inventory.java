package com.flowstock.inventory.domain;

import com.flowstock.common.entity.BaseEntity;
import com.flowstock.location.domain.Location;
import com.flowstock.product.domain.Product;
import com.flowstock.warehouse.domain.Warehouse;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(
        name = "inventories",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_inventories_product_location",
                columnNames = {"product_id", "warehouse_id", "location_id"}
        )
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Inventory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inventory_id")
    private Long inventoryId; // 재고 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product; // 상품

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_id", nullable = false)
    private Warehouse warehouse; // 창고

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = false)
    private Location location; // 로케이션

    @Column(name = "on_hand_qty", nullable = false)
    private Integer onHandQty; // 현재고 수량

    @Column(name = "allocated_qty", nullable = false)
    private Integer allocatedQty; // 할당 수량

    @Column(name = "last_inbound_at")
    private LocalDateTime lastInboundAt; // 마지막 입고 일시

    @Column(name = "last_outbound_at")
    private LocalDateTime lastOutboundAt; // 마지막 출고 일시
}
