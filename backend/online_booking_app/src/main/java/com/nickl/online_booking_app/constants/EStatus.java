package com.nickl.online_booking_app.constants;

public enum EStatus {
    ACTIVE(1, "Active"),
    CANCELLED(2, "Cancelled");

    private int statusCd;
    private String statusDescription;

    private EStatus(int statusCd, String statusDescription)
    {
        this.statusCd = statusCd;
        this.statusDescription = statusDescription;
    }

    public int getStatusCd()
    {
        return statusCd;
    }

    public String getStatusDescription()
    {
        return statusDescription;
    }

    public static EStatus of(int statusCd)
    {
        for (EStatus status : values())
        {
            if (status.statusCd == statusCd)
            {
                return status;
            }
        }
        return null;
    }
}
