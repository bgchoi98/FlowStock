package com.flowstock.admin.domain;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AuditLog {

    private Long auditLogId; // 감사 로그 ID

    private Long actorUserId; // 수행자 사용자 ID

    private String actionType; // 작업 유형

    private String targetType; // 대상 유형

    private Long targetId; // 대상 ID

    private String beforeValue; // 변경 전 값

    private String afterValue; // 변경 후 값

    private LocalDateTime createdAt; // 생성 일시
}
