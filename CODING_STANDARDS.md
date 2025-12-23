# Frappe/ERPNext Coding Standards

These rules are based on [Frappe Coding Standards](https://github.com/frappe/erpnext/wiki/Coding-Standards).

## General
- **Indentation**: Use **Tabs**, not spaces.
- **Translation**: All user-facing strings must be translatable.
  - Python: `frappe._("String")`
  - JavaScript: `__("String")`
- **Simplicity**:
  - Keep functions short (< 10 lines ideal).
  - Break complex logical conditions into multiple lines/variables.
- **Comments**: Explain *why* code is written a certain way, not just *what* it does.

## Python (Server Side)
- **Business Logic**: Must be implemented on the server side (Python) to ensure API compatibility.
- **Function Order**: Generic/Caller functions at the top, called/specific functions below.
- **SQL Injection**:
  - NEVER use f-strings or `.format()` for values in SQL queries.
  - ALWAYS use parameterized queries: `frappe.db.sql("SELECT ... WHERE name=%s", (value,))`
- **Query Tools**:
  - Prefer `frappe.qb` (Query Builder), `frappe.get_all`, or `frappe.db.get_value` over raw SQL.
  - Keyword usage in raw SQL should be uppercase (`SELECT`, `FROM`, `WHERE`).

## JavaScript (Client Side)
- **Deprecated APIs**: Avoid `cur_frm`, `$c_obj`, `add_fetch`. Use modern equivalents (e.g., `frm`, `frappe.db.get_value`).

## Commit Messages
- Follow [Conventional Commits](https://www.conventionalcommits.org/).
  - Format: `type(scope): description`
  - Example: `fix(invoice): update tax calculation logic`
