package com.vti.entity;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;
import org.springframework.beans.factory.annotation.Autowired;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "`User`")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`", unique = true, nullable = false)
    private int id;

    @Column(name = "`username`", nullable = false, length = 50, unique = true)
    private String userName;

    @Column(name = "`email`", nullable = false, length = 50, unique = true)
    private String email;

    @Column(name = "`password`", nullable = false, length = 800)
    private String password;

    @Column(name = "`firstName`", nullable = false, length = 50)
    private String firstName;

    @Column(name = "`lastName`", nullable = false, length = 50)
    private String lastName;

    @Formula("concat(firstName, ' ', lastName)")
    private String fullName;

    @Column(name = "role", nullable = false)
    private String role = "Employee";

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "`status`", nullable = false)
    private UserStatus status = UserStatus.NOT_ACTIVE;
    @Column
    private String avatarUrl;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<UserTrip> userTrips;
    @OneToMany(mappedBy = "user")
    private List<Booking> bookings;
    public User(String userName, String email, String password, String firstName, String lastName) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }


    public enum Role {
        ADMIN("Admin"), EMPLOYEE("Employee");
        private String value;

        private Role(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        public static User.Role toEnum(String sqlValue) {
            for (User.Role role : User.Role.values()) {
                if (role.getValue().equals(sqlValue)) {
                    return role;
                }
            }
            return null;
        }
    }

}