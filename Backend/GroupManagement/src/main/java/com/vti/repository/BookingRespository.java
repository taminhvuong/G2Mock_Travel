package com.vti.repository;


import com.vti.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
public interface BookingRespository  extends JpaRepository<Booking, Integer> , JpaSpecificationExecutor<Booking> {

    List<Booking> findAll();
@Query("from Booking where user.userName=:userName and status =:status")
    List<Booking> findByUser(@Param("userName") String userName,@Param("status") int status);
    Booking findById(int id);
    @Transactional
    void deleteById(int  id);

    @Transactional
    @Modifying
    @Query("delete from Booking where id IN (:ids)")
    public void deleteByListId(@Param("ids") List<Integer> ids);
}
