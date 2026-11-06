-- SawtFlow order operations schema
-- Target: MySQL 8.0+
-- Store real provider IDs in external_order_id; do not store payment data here.

CREATE DATABASE IF NOT EXISTS sawtflow
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE sawtflow;

CREATE TABLE IF NOT EXISTS orders (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  external_order_id VARCHAR(64) NOT NULL,
  customer_external_ref VARCHAR(128) NULL,
  status VARCHAR(40) NOT NULL,
  fulfillment_status VARCHAR(40) NULL,
  payment_status VARCHAR(40) NULL,
  currency CHAR(3) NULL,
  total_amount DECIMAL(12,2) NULL,
  delivery_address JSON NULL,
  provider_payload JSON NULL,
  version INT UNSIGNED NOT NULL DEFAULT 1,
  placed_at DATETIME(3) NULL,
  delivered_at DATETIME(3) NULL,
  canceled_at DATETIME(3) NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uq_orders_external_id (external_order_id),
  KEY idx_orders_status_updated (status, updated_at),
  KEY idx_orders_customer_ref (customer_external_ref),
  CONSTRAINT chk_orders_total_amount CHECK (total_amount IS NULL OR total_amount >= 0),
  CONSTRAINT chk_orders_version CHECK (version >= 1)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_action_requests (
  id CHAR(36) NOT NULL,
  order_id BIGINT UNSIGNED NOT NULL,
  action_type ENUM('cancel', 'modify') NOT NULL,
  state ENUM('pending_approval', 'approved', 'rejected', 'executing', 'completed', 'failed', 'expired') NOT NULL DEFAULT 'pending_approval',
  requested_by VARCHAR(128) NOT NULL,
  approved_by VARCHAR(128) NULL,
  reason VARCHAR(500) NULL,
  requested_changes JSON NULL,
  before_snapshot JSON NULL,
  after_snapshot JSON NULL,
  idempotency_key VARCHAR(128) NOT NULL,
  approval_expires_at DATETIME(3) NULL,
  approved_at DATETIME(3) NULL,
  executed_at DATETIME(3) NULL,
  failure_code VARCHAR(80) NULL,
  failure_message VARCHAR(500) NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uq_action_idempotency (idempotency_key),
  KEY idx_action_order_state (order_id, state, created_at),
  KEY idx_action_approval_expiry (state, approval_expires_at),
  CONSTRAINT fk_action_order FOREIGN KEY (order_id) REFERENCES orders (id),
  CONSTRAINT chk_action_changes CHECK (action_type = 'cancel' OR requested_changes IS NOT NULL)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS audit_log (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  event_id CHAR(36) NOT NULL,
  occurred_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  actor_type ENUM('customer', 'agent', 'operator', 'system', 'integration') NOT NULL,
  actor_ref VARCHAR(128) NULL,
  event_type VARCHAR(80) NOT NULL,
  order_id BIGINT UNSIGNED NULL,
  action_request_id CHAR(36) NULL,
  approval_ref VARCHAR(128) NULL,
  correlation_id VARCHAR(128) NULL,
  idempotency_key VARCHAR(128) NULL,
  before_state JSON NULL,
  after_state JSON NULL,
  metadata JSON NULL,
  source_ip_hash CHAR(64) NULL,
  user_agent_hash CHAR(64) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_audit_event_id (event_id),
  KEY idx_audit_order_time (order_id, occurred_at),
  KEY idx_audit_action_time (action_request_id, occurred_at),
  KEY idx_audit_correlation (correlation_id),
  KEY idx_audit_type_time (event_type, occurred_at),
  CONSTRAINT fk_audit_order FOREIGN KEY (order_id) REFERENCES orders (id),
  CONSTRAINT fk_audit_action FOREIGN KEY (action_request_id) REFERENCES order_action_requests (id)
) ENGINE=InnoDB;

-- Append-only audit policy: grant the application INSERT/SELECT, but no UPDATE/DELETE.
-- Apply permissions separately using the deployment environment's database user management.
-- Recommended event_type values:
-- order.lookup_requested, order.lookup_succeeded, order.lookup_failed,
-- order.cancel_requested, order.cancel_approved, order.cancel_rejected,
-- order.modify_requested, order.modify_approved, order.modify_rejected,
-- order.action_completed, order.action_failed.
