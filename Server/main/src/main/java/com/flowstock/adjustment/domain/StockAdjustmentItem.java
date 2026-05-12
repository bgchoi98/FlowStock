package com.flowstock.adjustment.domain;

import com.flowstock.common.entity.BaseCreatedEntity;
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
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "stock_adjustment_items")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StockAdjustmentItem extends BaseCreatedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "adjustment_item_id")
    private Long adjustmentItemId; // 재고조정 상세 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "adjustment_id", nullable = false)
    private StockAdjustment adjustment; // 재고조정

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product; // 상품

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_id", nullable = false)
    private Warehouse warehouse; // 창고

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = false)
    private Location location; // 로케이션

    @Column(name = "before_qty", nullable = false)
    private Integer beforeQty; // 조정 전 수량

    @Column(name = "adjust_qty", nullable = false)
    private Integer adjustQty; // 조정 수량

    @Column(name = "after_qty", nullable = false)
    private Integer afterQty; // 조정 후 수량
}
