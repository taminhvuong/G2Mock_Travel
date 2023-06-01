package com.example.travel_mock2302.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    @Formula("concat(first_name, ' ', last_name)")
    private String fullName;

    @Column(columnDefinition = "ENUM('Admin','Employee') Default 'Employee' ")

    @Convert(converter = RoleTypeConvert.class)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<UserTrip> userTrips;

    public enum Role{
        ADMIN("Admin"), EMPLOYEE("Employee");
        private  String value;
        private Role(String value){this.value=value;}
        public String getValue(){return  value;}
        public static User.Role toEnum(String sqlValue){
            for(User.Role role : User.Role.values()){
                if(role.getValue().equals(sqlValue)){
                    return role;
                }
            }
            return null;
        }
    }
}
