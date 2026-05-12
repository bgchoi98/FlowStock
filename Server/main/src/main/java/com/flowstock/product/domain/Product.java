package com.flowstock.product.domain;

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
@Table(name = "products")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId; // 상품 ID

    @Column(nullable = false, unique = true, length = 50)
    private String sku; // 내부 상품 코드

    @Column(unique = true, length = 100)
    private String barcode; // 스캔용 바코드

    @Column(name = "product_name", nullable = false, length = 100)
    private String productName; // 상품명

    @Enumerated(EnumType.STRING)
    @Column(name = "product_type", length = 30)
    private ProductType productType; // 상품 유형

    @Column(nullable = false, length = 20)
    private String unit; // 단위

    @Column(name = "safety_stock", nullable = false)
    private Integer safetyStock; // 안전 재고 수량

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private CommonStatus status; // 상태
}
