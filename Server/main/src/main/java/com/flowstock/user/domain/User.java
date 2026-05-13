package com.flowstock.user.domain;

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
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId; // 사용자 ID

    @Column(name = "login_id", nullable = false, unique = true, length = 50)
    private String loginId; // 로그인 ID

    @Column(nullable = false)
    private String password; // 비밀번호

    @Column(name = "user_name", nullable = false, length = 100)
    private String userName; // 사용자명

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private UserRole role; // 권한

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private CommonStatus status; // 상태
}
