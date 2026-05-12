package com.flowstock.admin.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DailyOperationStatistic {

    private Long statId; // 통계 ID

    private LocalDate statDate; // 통계 일자

    private Integer totalInboundCount; // 총 입고 건수

    private Integer totalInboundQty; // 총 입고 수량

    private Integer totalOrderCount; // 총 주문 건수

    private Integer totalOrderQty; // 총 주문 수량

    private Integer totalShipmentCount; // 총 출고 건수

    private Integer totalShipmentQty; // 총 출고 수량

    private Integer lowStockProductCount; // 안전재고 미달 상품 수

    private LocalDateTime createdAt; // 생성 일시
}
