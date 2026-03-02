import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";

module {
  type OldAdmissionEnquiry = {
    id : Nat;
    studentName : Text;
    parentName : Text;
    contactNumber : Text;
    gradeApplying : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type OldActor = {
    enquiries : Map.Map<Nat, OldAdmissionEnquiry>;
    nextId : Nat;
  };

  type NewAdmissionEnquiry = {
    id : Nat;
    studentName : Text;
    parentName : Text;
    contactNumber : Text;
    gradeApplying : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type NewActor = {
    enquiries : Map.Map<Nat, NewAdmissionEnquiry>;
    nextId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    old;
  };
};
