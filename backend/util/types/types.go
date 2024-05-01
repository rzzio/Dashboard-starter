package types

type (
	StatusType string
	Priority   string
)

const (
	PendingStatus    StatusType = "Pending"
	CompletedStatus  StatusType = "Completed"
	UnassignedStatus StatusType = "Unassigned"
)

const (
	PriorityHigh   Priority = "High"
	PriorityLow    Priority = "Low"
	PriorityMedium Priority = "Medium"
)
