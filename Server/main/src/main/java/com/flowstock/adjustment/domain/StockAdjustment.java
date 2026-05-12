package com.flowstock.adjustment.domain;

import com.flowstock.common.entity.BaseEntity;
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
@Table(name = "stock_adjustments")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StockAdjustment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "adjustment_id")
    private Long adjustmentId; // 재고조정 ID

    @Column(name = "adjustment_no", nullable = false, unique = true, length = 50)
    private String adjustmentNo; // 재고조정 번호

    @Enumerated(EnumType.STRING)
    @Column(name = "adjustment_type", nullable = false, length = 30)
    private AdjustmentType adjustmentType; // 재고조정 유형

    @Column(length = 255)
    private String reason; // 사유

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private AdjustmentStatus status; // 상태

    @Column(name = "requested_by_user_id")
    private Long requestedByUserId; // 요청자 사용자 ID

    @Column(name = "approved_by_user_id")
    private Long approvedByUserId; // 승인자 사용자 ID
}
