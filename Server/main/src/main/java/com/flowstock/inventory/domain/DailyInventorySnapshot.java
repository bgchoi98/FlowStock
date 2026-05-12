package com.flowstock.inventory.domain;

import com.flowstock.common.entity.BaseCreatedEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(
        name = "daily_inventory_snapshots",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_daily_inventory_snapshots",
                columnNames = {"snapshot_date", "product_id", "warehouse_id", "location_id"}
        )
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DailyInventorySnapshot extends BaseCreatedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "snapshot_id")
    private Long snapshotId; // 스냅샷 ID

    @Column(name = "snapshot_date", nullable = false)
    private LocalDate snapshotDate; // 스냅샷 일자

    @Column(name = "product_id", nullable = false)
    private Long productId; // 상품 ID

    @Column(name = "warehouse_id", nullable = false)
    private Long warehouseId; // 창고 ID

    @Column(name = "location_id", nullable = false)
    private Long locationId; // 로케이션 ID

    @Column(name = "on_hand_qty", nullable = false)
    private Integer onHandQty; // 현재고 수량

    @Column(name = "allocated_qty", nullable = false)
    private Integer allocatedQty; // 할당 수량
}
