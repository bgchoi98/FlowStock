package com.flowstock.warehouse.domain;

import com.flowstock.common.domain.CommonStatus;
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
@Table(name = "warehouses")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Warehouse extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warehouse_id")
    private Long warehouseId; // 창고 ID

    @Column(name = "warehouse_code", nullable = false, unique = true, length = 50)
    private String warehouseCode; // 창고 코드

    @Column(name = "warehouse_name", nullable = false, length = 100)
    private String warehouseName; // 창고명

    @Column(length = 255)
    private String address; // 주소

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private CommonStatus status; // 상태
}
