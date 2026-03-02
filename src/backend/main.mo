import Time "mo:core/Time";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Migration "migration";

(with migration = Migration.run)
actor {
  type AdmissionEnquiry = {
    id : Nat;
    studentName : Text;
    parentName : Text;
    contactNumber : Text;
    gradeApplying : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module AdmissionEnquiry {
    public func compare(admissionEnquiry1 : AdmissionEnquiry, admissionEnquiry2 : AdmissionEnquiry) : Order.Order {
      Nat.compare(admissionEnquiry1.id, admissionEnquiry2.id);
    };
  };

  let enquiries = Map.empty<Nat, AdmissionEnquiry>();
  var nextId = 1;

  public shared ({ caller }) func submitEnquiry(studentName : Text, parentName : Text, contactNumber : Text, gradeApplying : Text, message : Text) : async Nat {
    let enquiry : AdmissionEnquiry = {
      id = nextId;
      studentName;
      parentName;
      contactNumber;
      gradeApplying;
      message;
      timestamp = Time.now();
    };
    enquiries.add(nextId, enquiry); // Fixed from Map.put() to Map.add()
    nextId += 1;
    enquiry.id;
  };

  public query ({ caller }) func getAllEnquiries() : async [AdmissionEnquiry] {
    enquiries.values().toArray().sort(
      func(enquiry1, enquiry2) {
        Nat.compare(enquiry1.id, enquiry2.id);
      }
    );
  };

  public query ({ caller }) func getEnquiryById(id : Nat) : async AdmissionEnquiry {
    switch (enquiries.get(id)) {
      case (null) { Runtime.trap("Enquiry not found") };
      case (?enquiry) { enquiry };
    };
  };
};

