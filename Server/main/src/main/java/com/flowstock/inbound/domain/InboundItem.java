package com.flowstock.inbound.domain;

import com.flowstock.common.entity.BaseEntity;
import com.flowstock.location.domain.Location;
import com.flowstock.product.domain.Product;
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
@Table(name = "inbound_items")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InboundItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inbound_item_id")
    private Long inboundItemId; // 입고 상세 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inbound_id", nullable = false)
    private Inbound inbound; // 입고

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product; // 상품

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = false)
    private Location location; // 로케이션

    @Column(name = "inbound_qty", nullable = false)
    private Integer inboundQty; // 입고 예정 수량

    @Column(name = "received_qty", nullable = false)
    private Integer receivedQty; // 입고 완료 수량
}
