package com.flowstock.inbound.domain;

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
@Table(name = "inbounds")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Inbound extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inbound_id")
    private Long inboundId; // 입고 ID

    @Column(name = "inbound_no", nullable = false, unique = true, length = 50)
    private String inboundNo; // 입고 번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partner_id", nullable = false)
    private Partner partner; // 거래처

    @Column(name = "inbound_date", nullable = false)
    private LocalDate inboundDate; // 입고 일자

    @Enumerated(EnumType.STRING)
    @Column(name = "inbound_status", nullable = false, length = 30)
    private InboundStatus inboundStatus; // 입고 상태

    @Column(name = "created_by_user_id")
    private Long createdByUserId; // 생성자 사용자 ID
}
