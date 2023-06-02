package com.vti.entity;

import javax.persistence.AttributeConverter;

public class RoleTypeConvert implements AttributeConverter<User.Role , String> {


    @Override
    public String convertToDatabaseColumn(User.Role role) {
        if (role == null) {
            return null;

        }
        return role.getValue();
    }

    @Override
    public User.Role convertToEntityAttribute(String sqlValue) {
        if (sqlValue == null) {
            return null;
        }
        return User.Role.toEnum(sqlValue);
    }
}
