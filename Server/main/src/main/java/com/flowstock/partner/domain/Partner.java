package com.flowstock.partner.domain;

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
@Table(name = "partners")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Partner extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "partner_id")
    private Long partnerId; // 거래처 ID

    @Column(name = "partner_code", nullable = false, unique = true, length = 50)
    private String partnerCode; // 거래처 코드

    @Column(name = "partner_name", nullable = false, length = 100)
    private String partnerName; // 거래처명

    @Enumerated(EnumType.STRING)
    @Column(name = "partner_type", nullable = false, length = 30)
    private PartnerType partnerType; // 거래처 유형

    @Column(name = "business_no", length = 30)
    private String businessNo; // 사업자 번호

    @Column(name = "contact_name", length = 100)
    private String contactName; // 담당자명

    @Column(name = "contact_phone", length = 30)
    private String contactPhone; // 담당자 연락처

    @Column(length = 255)
    private String address; // 주소

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private CommonStatus status; // 상태
}
