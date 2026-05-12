package com.flowstock.order.domain;

import com.flowstock.common.entity.BaseEntity;
import com.flowstock.partner.domain.Partner;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "orders")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Order extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId; // 주문 ID

    @Column(name = "order_no", nullable = false, unique = true, length = 50)
    private String orderNo; // 주문 번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partner_id", nullable = false)
    private Partner partner; // 거래처

    @Column(name = "order_date", nullable = false)
    private LocalDate orderDate; // 주문 일자

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status", nullable = false, length = 30)
    private OrderStatus orderStatus; // 주문 상태

    @Column(name = "requested_ship_date")
    private LocalDate requestedShipDate; // 요청 출고 일자

    @Column(name = "created_by_user_id")
    private Long createdByUserId; // 생성자 사용자 ID
}
