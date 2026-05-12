package com.flowstock.location.domain;

import com.flowstock.common.domain.CommonStatus;
import com.flowstock.common.entity.BaseEntity;
import com.flowstock.warehouse.domain.Warehouse;
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
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(
        name = "locations",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_locations_warehouse_code",
                columnNames = {"warehouse_id", "location_code"}
        )
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Location extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private Long locationId; // 로케이션 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_id", nullable = false)
    private Warehouse warehouse; // 창고

    @Column(name = "location_code", nullable = false, length = 50)
    private String locationCode; // 로케이션 코드

    @Column(name = "location_name", nullable = false, length = 100)
    private String locationName; // 로케이션명

    @Enumerated(EnumType.STRING)
    @Column(name = "location_type", nullable = false, length = 30)
    private LocationType locationType; // 로케이션 유형

    @Column(name = "zone_code", length = 30)
    private String zoneCode; // 구역 코드

    @Column(name = "row_no")
    private Integer rowNo; // 행 번호

    @Column(name = "column_no")
    private Integer columnNo; // 열 번호

    @Column(name = "level_no")
    private Integer levelNo; // 단 번호

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private CommonStatus status; // 상태
}
